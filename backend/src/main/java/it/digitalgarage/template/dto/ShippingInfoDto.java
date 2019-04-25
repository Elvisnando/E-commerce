package it.digitalgarage.template.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShippingInfoDto {

    private Long id;

    private Long userId;

    private String address;

}