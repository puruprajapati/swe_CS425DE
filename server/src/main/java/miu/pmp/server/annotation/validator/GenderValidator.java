package miu.pmp.server.annotation.validator;

import miu.pmp.server.annotation.Gender;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Arrays;
import java.util.List;

/**
 * The type Gender validator.
 */
public class GenderValidator implements ConstraintValidator<Gender,String> {
    private final List<String> genders = Arrays.asList("MALE", "FEMALE", "OTHER");

    /**
     * Is valid boolean.
     *
     * @param value                      the value
     * @param constraintValidatorContext the constraint validator context
     * @return the boolean
     */
    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {

        return genders.contains(value);
    }
}
