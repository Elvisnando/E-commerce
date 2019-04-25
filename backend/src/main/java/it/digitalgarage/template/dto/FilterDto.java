package it.digitalgarage.template.dto;


import lombok.*;

import java.math.BigInteger;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FilterDto {


    private String name;
    private String producer;
    private String location;
    private String expireDate;
    private BigInteger min;
    private BigInteger max;
    private BigInteger availability;
}
