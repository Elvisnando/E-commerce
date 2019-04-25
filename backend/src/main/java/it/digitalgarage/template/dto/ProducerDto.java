package it.digitalgarage.template.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProducerDto {

    private Long id;

    private String address;

    private String piva;
}
