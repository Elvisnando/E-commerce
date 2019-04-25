package it.digitalgarage.template.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResetPasswordDto {

    private String token;

    private String password;
}
