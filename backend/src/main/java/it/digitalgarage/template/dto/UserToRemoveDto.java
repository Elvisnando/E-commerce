package it.digitalgarage.template.dto;


import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserToRemoveDto {

    private Long id;

    private int type;
}
