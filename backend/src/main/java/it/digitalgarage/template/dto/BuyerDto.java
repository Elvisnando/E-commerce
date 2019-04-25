package it.digitalgarage.template.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BuyerDto {

    private Long id;

    private String surname;

    private String birthday;


}
