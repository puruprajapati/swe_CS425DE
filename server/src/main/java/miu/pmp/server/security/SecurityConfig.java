package miu.pmp.server.security;

import miu.pmp.server.utils.enums.ERole;
import org.keycloak.adapters.springsecurity.KeycloakSecurityComponents;
import org.keycloak.adapters.springsecurity.authentication.KeycloakAuthenticationProvider;
import org.keycloak.adapters.springsecurity.config.KeycloakWebSecurityConfigurerAdapter;
import org.keycloak.adapters.springsecurity.filter.KeycloakAuthenticatedActionsFilter;
import org.keycloak.adapters.springsecurity.filter.KeycloakAuthenticationProcessingFilter;
import org.keycloak.adapters.springsecurity.filter.KeycloakPreAuthActionsFilter;
import org.keycloak.adapters.springsecurity.filter.KeycloakSecurityContextRequestFilter;
import org.keycloak.adapters.springsecurity.management.HttpSessionManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.authority.mapping.SimpleAuthorityMapper;
import org.springframework.security.web.authentication.session.NullAuthenticatedSessionStrategy;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;

/**
 * The type Security config.
 */
//@Configuration
//@EnableWebSecurity
//@EnableGlobalMethodSecurity(prePostEnabled = true)
//@ComponentScan(basePackageClasses = KeycloakSecurityComponents.class)
public class SecurityConfig extends KeycloakWebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        super.configure(http);



        http.cors().and().csrf().disable().sessionManagement().
                sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().authorizeRequests()
                .antMatchers("/api/properties/test/noti").permitAll()
                .antMatchers("/chat").permitAll()
                .antMatchers("/chat/info").permitAll()
                .antMatchers("/chat/**").permitAll()
                .antMatchers("/api/landlord/*").permitAll()


                .antMatchers("/api/landlord/").hasAnyAuthority(ERole.ROLE_ADMIN.getRole(), ERole.ROLE_LANDLORD.getRole())

                .antMatchers("/api/landlord/properties/*").permitAll()
                .antMatchers("/api/mail/sendMail").permitAll()
                .antMatchers("/api/auth/login").permitAll()
                .antMatchers("/api/auth/register").permitAll()
                .antMatchers("/api/auth/reset-password-by-user").permitAll()
                .antMatchers("/api/auth/create-new-password").permitAll()
                .antMatchers("/api/properties").permitAll()
                .antMatchers("/api/properties/**").permitAll()

                .antMatchers("/api/properties/rent").hasAuthority("ROLE_TENANT")


                .antMatchers("/api/admin").hasAuthority(ERole.ROLE_ADMIN.getRole())
                .antMatchers("/api/payment/*").permitAll()
                .antMatchers("/api/property-rental-histories/*").permitAll()

                .antMatchers("/api/users/*").permitAll() //pprajapati: need to pass bearer token from admin
                .antMatchers("/api/users/rental-history").hasAuthority("ROLE_TENANT")

                .antMatchers("/api/users/").hasAuthority(ERole.ROLE_ADMIN.getRole())
                .antMatchers("/api/file").hasAnyAuthority(ERole.ROLE_LANDLORD.getRole(), ERole.ROLE_ADMIN.getRole())
                .antMatchers("/static/*").permitAll()

                .anyRequest().authenticated();

    }


    @Override
    protected SessionAuthenticationStrategy sessionAuthenticationStrategy() {
        /**
         * Returning NullAuthenticatedSessionStrategy means app will not remember session
         */

        return new NullAuthenticatedSessionStrategy();
    }

    /**
     * Configure global.
     *
     * @param auth the auth
     * @throws Exception the exception
     */
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        KeycloakAuthenticationProvider keycloakAuthenticationProvider =
                keycloakAuthenticationProvider();

        keycloakAuthenticationProvider.setGrantedAuthoritiesMapper(new SimpleAuthorityMapper());

        auth.authenticationProvider(keycloakAuthenticationProvider);
    }

    /**
     * Keycloak authentication processing filter registration bean filter registration bean.
     *
     * @param filter the filter
     * @return the filter registration bean
     */
    @Bean
    public FilterRegistrationBean<?> keycloakAuthenticationProcessingFilterRegistrationBean(
            KeycloakAuthenticationProcessingFilter filter) {

        FilterRegistrationBean<?> registrationBean = new FilterRegistrationBean<>(filter);

        registrationBean.setEnabled(false);
        return registrationBean;
    }

    /**
     * Keycloak pre auth actions filter registration bean filter registration bean.
     *
     * @param filter the filter
     * @return the filter registration bean
     */
    @Bean
    public FilterRegistrationBean<?> keycloakPreAuthActionsFilterRegistrationBean(
            KeycloakPreAuthActionsFilter filter) {

        FilterRegistrationBean<?> registrationBean = new FilterRegistrationBean<>(filter);
        registrationBean.setEnabled(false);
        return registrationBean;
    }

    /**
     * Keycloak authenticated actions filter bean filter registration bean.
     *
     * @param filter the filter
     * @return the filter registration bean
     */
    @Bean
    public FilterRegistrationBean<?> keycloakAuthenticatedActionsFilterBean(
            KeycloakAuthenticatedActionsFilter filter) {

        FilterRegistrationBean<?> registrationBean = new FilterRegistrationBean<>(filter);

        registrationBean.setEnabled(false);
        return registrationBean;
    }

    /**
     * Keycloak security context request filter bean filter registration bean.
     *
     * @param filter the filter
     * @return the filter registration bean
     */
    @Bean
    public FilterRegistrationBean<?> keycloakSecurityContextRequestFilterBean(
            KeycloakSecurityContextRequestFilter filter) {

        FilterRegistrationBean<?> registrationBean = new FilterRegistrationBean<>(filter);

        registrationBean.setEnabled(false);

        return registrationBean;
    }

    @Bean
    @Override
    @ConditionalOnMissingBean(HttpSessionManager.class)
    protected HttpSessionManager httpSessionManager() {
        return new HttpSessionManager();
    }

    @Override
    public void init(WebSecurity builder) throws Exception {

    }

    @Override
    public void configure(WebSecurity builder) throws Exception {

    }
}
