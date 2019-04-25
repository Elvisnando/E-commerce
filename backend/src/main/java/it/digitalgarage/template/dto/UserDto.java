package it.digitalgarage.template.dto;

import lombok.*;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private Long id;

    @NotNull
    @NotEmpty
    @Email
    private String email;

    @NotNull
    @NotEmpty
    private String password; //@Pattern(regexp = "")

    private String name;

    private boolean isBusiness;

    private boolean isProducer;

    private boolean isMerchant;

    private boolean isRestaurant;

    private boolean isAdmin;

    private boolean isActive;

    private String confirmToken;

    private  boolean inRecovery;

    private int question;

    private String answer;
}