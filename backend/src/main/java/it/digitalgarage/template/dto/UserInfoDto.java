package it.digitalgarage.template.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoDto {

    private String name;

    private String surname;

    private String birthday;

    private String address;

    private String piva;

    private String password;
}
