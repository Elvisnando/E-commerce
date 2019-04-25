package it.digitalgarage.template.dto;


import it.digitalgarage.template.entity.User;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TokenDto {
    private String token;
    private User user;
}
