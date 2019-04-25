package it.digitalgarage.template.dto;

import lombok.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationRequestBodyDto {

    private BuyerDto buyerDto;
    private MerchantDto merchantDto;
    private RestaurantDto restaurantDto;
    private ProducerDto producerDto;
    @NotNull
    @Valid
    private UserDto userDto;

}
