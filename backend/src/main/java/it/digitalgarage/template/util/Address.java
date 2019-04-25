package it.digitalgarage.template.util;


import lombok.*;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Address {

    private String country;
    private String province;
    private String city;
    private String cap;
    private String address;
    private String number;

    @Override
    public String toString() {
        return String.join(", ", String.join(" ", address, number), city, cap, province, country);
    }
}
