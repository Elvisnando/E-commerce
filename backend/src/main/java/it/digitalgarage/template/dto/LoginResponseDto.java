package it.digitalgarage.template.dto;


import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDto {

    //private boolean status;

    private String token;

}
