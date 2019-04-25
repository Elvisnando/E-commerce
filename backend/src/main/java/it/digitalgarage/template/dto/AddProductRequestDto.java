package it.digitalgarage.template.dto;

import it.digitalgarage.template.entity.Product;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddProductRequestDto {

    private ProductDto productDto;

    private MultipartFile image;
}
