package miu.pmp.server.security.service.impl;

import miu.pmp.server.domain.PasswordResetToken;
import miu.pmp.server.domain.Role;
import miu.pmp.server.domain.User;
import miu.pmp.server.dto.*;
import miu.pmp.server.dto.common.ResponseMessage;
import miu.pmp.server.dto.common.TokenWithUserDTO;
import miu.pmp.server.exceptionHandler.exceptions.CustomErrorException;
import miu.pmp.server.repo.PasswordResetTokenRepo;
import miu.pmp.server.repo.RoleRepo;
import miu.pmp.server.repo.UserRepo;
import miu.pmp.server.service.impl.UserServiceImpl;
import miu.pmp.server.utils.email.EmailDetails;
import miu.pmp.server.utils.email.service.EmailService;
import miu.pmp.server.utils.enums.ERole;
import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.keycloak.KeycloakPrincipal;
import org.keycloak.KeycloakSecurityContext;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.authorization.client.AuthzClient;
import org.keycloak.authorization.client.Configuration;
import org.keycloak.representations.AccessTokenResponse;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.ws.rs.core.Response;
import java.time.LocalDateTime;
import java.util.*;

import static miu.pmp.server.utils.constants.ResponseMessageConstants.*;

/**
 * The type Auth service.
 */
@Service
public class AuthServiceImpl {

    private final UserServiceImpl userService;
    private final UserRepo userRepo;
    private final RoleRepo roleRepo;

    private final EmailService emailService;

    private final PasswordResetTokenRepo passwordResetTokenRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;
    private static final Logger log = LoggerFactory.getLogger(AuthServiceImpl.class);

//  @Value("${ckc.auth-server-url}")
//  private static String authServerUrl;
//  @Value("${ckc.realm}")
//  private static String realm;
//  @Value("${ckc.resource}")
//  private static String clientId;
//  @Value("${ckc.credentials.secret}")
//  private static String clientSecret;

    private static String authServerUrl = "http://localhost:8080";
    private static String realm = "pmp-realm";
    private static String clientId = "pmp-client";
    //Get client secret from the Keycloak admin console (in the credential tab)
    private static String clientSecret = "Bhw120rFFBSVLciCuictWw5wOuSbJmu2";


    @Value("${client.admin}")
    private String adminUrl;

    @Value("${client.domain}")
    private String clientUrl;

    /**
     * Instantiates a new Auth service.
     *
     * @param userService            the user service
     * @param userRepo               the user repo
     * @param roleRepo               the role repo
     * @param emailService           the email service
     * @param passwordResetTokenRepo the password reset token repo
     */
    public AuthServiceImpl(UserServiceImpl userService, UserRepo userRepo, RoleRepo roleRepo, EmailService emailService, PasswordResetTokenRepo passwordResetTokenRepo) {
        this.userService = userService;
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
        this.emailService = emailService;
        this.passwordResetTokenRepo = passwordResetTokenRepo;
    }

    /**
     * Register user response message.
     *
     * @param userDTO the user dto
     * @return the response message
     */
    public ResponseMessage registerUser(UserDTO userDTO) {
        Keycloak keycloak = getKeyCloak();


        // save user in authentication server
        UserRepresentation user = new UserRepresentation();
        user.setEnabled(true);
        user.setUsername(userDTO.getEmail());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEmail(userDTO.getEmail());

        // Get realm
        RealmResource realmResource = keycloak.realm(realm);
        UsersResource usersResource = realmResource.users();

        Response response = usersResource.create(user);

        if (response.getStatus() == 201) {

            String userId = CreatedResponseUtil.getCreatedId(response);
            log.info("Created userId {}", userId);

            // save user in resource server
            User userRS = new User();
            userRS.setEmail(userDTO.getEmail());
            userRS.setFirstName(userDTO.getFirstName());
            userRS.setLastName(userDTO.getLastName());
            userRS.setGender(userDTO.getGender());
            userRS.setPassword(passwordEncoder.encode(userDTO.getPassword()));
            userRS.setId(UUID.fromString(userId));
            userRS.setActive(true);

            // set user role in resource server
            Role roleRS = roleRepo.findByRoleName(userDTO.getRole());
            userRS.setRole(roleRS);

            userService.saveUser(userRS);

            String url = "";
            if(userDTO.getRole().equals(ERole.ROLE_ADMIN.getRole()) || userDTO.getRole().equals(ERole.ROLE_LANDLORD.getRole())){
                url = adminUrl + "/login/";
            } else {
                url = clientUrl + "/login/";
            }



            EmailDetails emailData = new EmailDetails();
            emailData.setRecipient(userDTO.getEmail());
            emailData.setSubject("Reset Password");
            emailData.setMsgBody("Hello, \n " +
                    "Thank you for registering into Gigabyte Property Management Portal. Please use below url for login \n "
                    + url +
                    "\n Regards, \n PMP Team");
            emailService.sendSimpleMail(emailData);


            // create password credential
            CredentialRepresentation passwordCred = new CredentialRepresentation();
            passwordCred.setTemporary(false);
            passwordCred.setType(CredentialRepresentation.PASSWORD);
            passwordCred.setValue(userDTO.getPassword());

            UserResource userResource = usersResource.get(userId);

            // Set password credential
            userResource.resetPassword(passwordCred);

            // Get realm role student
            RoleRepresentation realmRoleUser = realmResource.roles().get(userDTO.getRole()).toRepresentation();

            // Assign realm role student to user
            userResource.roles().realmLevel().add(Arrays.asList(realmRoleUser));

            return new ResponseMessage(SUCCESSFUL_MESSAGE, HttpStatus.OK, userDTO);
        } else if (response.getStatus() == 409) {
            log.error("Conflicting data is present");
            throw new CustomErrorException(HttpStatus.valueOf(response.getStatus()), UNSUCCESSFUL_MESSAGE, "Conflicting data is present");
        } else {
            log.error("Internal Server error");
            throw new CustomErrorException(HttpStatus.valueOf(response.getStatus()), UNSUCCESSFUL_MESSAGE, "Internal Server error");
        }

    }


    /**
     * Login response message.
     *
     * @param loginDTO the login dto
     * @return the response message
     */
    public ResponseMessage login(LoginDTO loginDTO) {

        try {
            Map<String, Object> clientCredentials = new HashMap<>();
            clientCredentials.put("secret", clientSecret);
            clientCredentials.put("grant_type", "password");

            Configuration configuration =
                    new Configuration(authServerUrl, realm, clientId, clientCredentials, null);
            AuthzClient authzClient = AuthzClient.create(configuration);

            AccessTokenResponse response =
                    authzClient.obtainAccessToken(loginDTO.getEmail(), loginDTO.getPassword());

            User user = userRepo.findByEmail(loginDTO.getEmail());
            if(user == null){
                throw new CustomErrorException(HttpStatus.UNAUTHORIZED, null, "Invalid user credentials");
            }

            TokenWithUserDTO userWithToken = new TokenWithUserDTO(user, response);

            return new ResponseMessage(SUCCESSFUL_MESSAGE, HttpStatus.OK, userWithToken);

        } catch (Exception ex) {
            log.error(ex.getMessage());
            throw new CustomErrorException(HttpStatus.UNAUTHORIZED, null, "Invalid user credentials");
        }
    }


    /**
     * Update user response message.
     *
     * @param id            the id
     * @param updateUserDTO the update user dto
     * @return the response message
     */
    public ResponseMessage updateUser(UUID id, UpdateUserDTO updateUserDTO) {

        Keycloak keycloak = getKeyCloak();
        Optional<User> user = userRepo.findById(id);
        if (user.isPresent()) {
            User u = user.get();
            u.setLastName(updateUserDTO.getLastName());
            u.setFirstName(updateUserDTO.getFirstName());

            try {
                var userResource = keycloak.realm(realm).users().get(u.getId().toString());
                var userPresentation = userResource.toRepresentation();
                userPresentation.setFirstName(updateUserDTO.getFirstName());
                userPresentation.setLastName(updateUserDTO.getLastName());
                userResource.update(userPresentation);

                userService.saveUser(u);
                return new ResponseMessage(SUCCESSFUL_MESSAGE, HttpStatus.OK, updateUserDTO);

            } catch (Exception ex) {
                log.error(ex.getMessage());
                throw new CustomErrorException(HttpStatus.BAD_REQUEST, null, UNSUCCESSFUL_MESSAGE);
            }

        }
        log.error(DATA_NOT_FOUND_TO_UPDATE);
        throw new CustomErrorException(HttpStatus.BAD_REQUEST, null, DATA_NOT_FOUND_TO_UPDATE);


    }

    /**
     * Activate user
     *
     * @param id       user id
     * @param isActive activate user dto
     * @return response message
     */
    public ResponseMessage activateUser(UUID id, boolean isActive) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            if (authentication.getPrincipal() instanceof KeycloakPrincipal) {
                KeycloakPrincipal<KeycloakSecurityContext> kp = (KeycloakPrincipal<KeycloakSecurityContext>) authentication.getPrincipal();
                String uuid = kp.getKeycloakSecurityContext().getToken().getId();
            }
        }

        Keycloak keycloak = getKeyCloak();
        Optional<User> user = userRepo.findById(id);
        if (user.isPresent()) {
            User u = user.get();
            u.setActive(isActive);

            try {
                var userResource = keycloak.realm(realm).users().get(u.getId().toString());
                var userPresentation = userResource.toRepresentation();
                userPresentation.setEnabled(isActive);
                userResource.update(userPresentation);

                userService.saveUser(u);
                return new ResponseMessage(SUCCESSFUL_MESSAGE, HttpStatus.OK, u);

            } catch (Exception ex) {
                log.error(ex.getMessage());
                throw new CustomErrorException(HttpStatus.BAD_REQUEST, null, UNSUCCESSFUL_MESSAGE);
            }

        }
        log.error(DATA_NOT_FOUND_TO_UPDATE);
        throw new CustomErrorException(HttpStatus.BAD_REQUEST, null, DATA_NOT_FOUND_TO_UPDATE);


    }

    /**
     * Reset password response message.
     *
     * @param id               the id
     * @param resetPasswordDTO the reset password dto
     * @return the response message
     */
    public ResponseMessage resetPassword(UUID id, ResetPasswordDTO resetPasswordDTO) {
        Keycloak keycloak = getKeyCloak();
        Optional<User> user = userRepo.findById(id);
        if (user.isPresent()) {
            try {
                var userResource = keycloak.realm(realm).users().get(id.toString());
                CredentialRepresentation cr = new CredentialRepresentation();
                cr.setType(CredentialRepresentation.PASSWORD);
                cr.setValue(resetPasswordDTO.getPassword());
                cr.setTemporary(false);
                userResource.resetPassword(cr);

                user.get().setPassword(resetPasswordDTO.getPassword());
                userService.saveUser(user.get());
                return new ResponseMessage(SUCCESSFULLY_UPDATED, HttpStatus.OK, "Password updated successfully");
            } catch (Exception e) {
                log.error(e.getMessage());
                throw new CustomErrorException(HttpStatus.BAD_REQUEST, null, UNSUCCESSFUL_MESSAGE);
            }

        }
        log.error(DATA_NOT_FOUND_TO_UPDATE);
        throw new CustomErrorException(HttpStatus.BAD_REQUEST, null, DATA_NOT_FOUND_TO_UPDATE);


    }

    /**
     * Reset password by user response message.
     *
     * @param email the email
     * @return the response message
     */
    public ResponseMessage resetPasswordByUser(String email) {
        User user = userRepo.findByEmail(email);
        if (user == null) {
            throw new CustomErrorException(HttpStatus.UNAUTHORIZED, USER_NOT_FOUND);
        }
        String token = UUID.randomUUID().toString();
        PasswordResetToken pst = new PasswordResetToken();
        pst.setUser(user);
        pst.setToken(token);
        pst.setExpiryDateTime(LocalDateTime.now().plusDays(1));
        passwordResetTokenRepo.save(pst);

        // send Email

//    adminUrl
//    clientUrl


        String url = "";
        if(user.getRole().getRoleName().equals(ERole.ROLE_ADMIN.getRole()) || user.getRole().getRoleName().equals(ERole.ROLE_LANDLORD.getRole())){
            url = adminUrl + "/create-new-password/";
        } else {
            url = clientUrl + "/create-new-password/";
        }

        EmailDetails emailData = new EmailDetails();
        emailData.setRecipient(user.getEmail());
        emailData.setSubject("Reset Password");
        emailData.setMsgBody("Hello, \n " +
                "To reset your passoword, please click this link: \n "
                + url + token +
                " \n This link will be expired in 24 hours. Please change your password before it expires. " +
                "\n Regards, \n PMP Team");
        emailService.sendSimpleMail(emailData);

        return new ResponseMessage(SUCCESSFUL_MESSAGE, HttpStatus.OK, "Mail Sent");

    }

    /**
     * Create new password response message.
     *
     * @param createNewPasswordDTO the create new password dto
     * @return the response message
     */
    public ResponseMessage createNewPassword(CreateNewPasswordDTO createNewPasswordDTO) {
        PasswordResetToken pst = passwordResetTokenRepo.findByToken(createNewPasswordDTO.getToken());
        if (pst == null || pst.getExpiryDateTime().isBefore(LocalDateTime.now())) {
            throw new CustomErrorException(HttpStatus.UNAUTHORIZED, USER_NOT_FOUND);
        }

        Keycloak keycloak = getKeyCloak();

        Optional<User> user = userRepo.findById(pst.getUser().getId());
        if (user.isPresent()) {
            try {
                var userResource = keycloak.realm(realm).users().get(user.get().getId().toString());
                CredentialRepresentation cr = new CredentialRepresentation();
                cr.setType(CredentialRepresentation.PASSWORD);
                cr.setValue(createNewPasswordDTO.getPassword());
                cr.setTemporary(false);
                userResource.resetPassword(cr);

                user.get().setPassword(passwordEncoder.encode(createNewPasswordDTO.getPassword()));
                userService.saveUser(user.get());
                return new ResponseMessage(SUCCESSFULLY_UPDATED, HttpStatus.OK, "Password updated successfully");
            } catch (Exception e) {
                log.error(e.getMessage());
                throw new CustomErrorException(HttpStatus.BAD_REQUEST, null, UNSUCCESSFUL_MESSAGE);
            }

        }
        log.error(DATA_NOT_FOUND_TO_UPDATE);
        throw new CustomErrorException(HttpStatus.BAD_REQUEST, null, DATA_NOT_FOUND_TO_UPDATE);

    }

    /**
     * Gets key cloak.
     *
     * @return the key cloak
     */
    public static Keycloak getKeyCloak() {
        Keycloak keycloak = KeycloakBuilder.builder()
                .serverUrl(authServerUrl)
//      .grantType(OAuth2Constants.PASSWORD)
                .grantType(OAuth2Constants.CLIENT_CREDENTIALS)
                .realm(realm)
                .clientId(clientId)
                .clientSecret(clientSecret)
//      .username("admin")
//      .password("admin")
                .resteasyClient(new ResteasyClientBuilder().connectionPoolSize(10).build())
                .build();

        keycloak.tokenManager().getAccessToken();
        return keycloak;

    }

}
