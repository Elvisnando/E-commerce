package it.digitalgarage.template.service;


import it.digitalgarage.template.dto.*;
import it.digitalgarage.template.entity.CartItems;

import it.digitalgarage.template.entity.User;
import it.digitalgarage.template.repository.CartRepository;
import it.digitalgarage.template.repository.ProductRepository;
import it.digitalgarage.template.repository.UserRepository;
import it.digitalgarage.template.util.exception.ChartProductException;
import it.digitalgarage.template.util.exception.ProductNotFoundException;
import it.digitalgarage.template.util.exception.QuantityNotMoreAvailableException;
import it.digitalgarage.template.util.exception.UserNotFoundByTokenException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import static org.reflections.Reflections.collect;

@Service
@Transactional
//to add globalExc
public class ManageProductInCartService {

    @Autowired
    private CartRepository cartrepository;

    @Autowired
    private UserRepository userrepository;

    @Autowired
    private ProductRepository productRepository;

    BigInteger one = new BigInteger("1");

    //to add exception
    public void addProductToCart(Long idUser, ProductToAddInCartDto productToAssociate) throws ChartProductException, UserNotFoundByTokenException, QuantityNotMoreAvailableException {
        System.out.println("Service add product cart");
        User userInDb = userrepository.findById(idUser);
        if(checkUserAndProduct(idUser, productToAssociate.getIdProduct())){
            /*if(cartrepository.findByUserIdAndProductId(idUser, productToAssociate.getIdProduct()).getQuantity() == productRepository.findById(productToAssociate.getIdProduct()).getAvailability()){
                throw new QuantityNotMoreAvailableException("No more pieces available");
            }*/

            CartItems chartUpdate = cartrepository.findByUserIdAndProductId(idUser, productToAssociate.getIdProduct());
            if (chartUpdate == null) {
                CartItems cartToSave = CartItems.builder()
                        .userId(userInDb.getId())
                        .productId(productToAssociate.getIdProduct())
                        .quantity(productToAssociate.getQuantity())
                        .addedDate(LocalDate.now())
                        .build();

                cartrepository.save(cartToSave);
            } else {
                BigInteger quantity = chartUpdate.getQuantity();
                chartUpdate.setQuantity(quantity.add(productToAssociate.getQuantity()));
                cartrepository.save(chartUpdate);
            }
        }
    }

    public BigInteger checkQuantityInCartPerProduct(Long idUser, ProductToAddInCartDto productToAssociate) throws ChartProductException, UserNotFoundByTokenException, ProductNotFoundException{
        if(cartrepository.findByUserIdAndProductId(idUser, productToAssociate.getIdProduct()) == null){
            throw new ProductNotFoundException();
        }

        if(checkUserAndProduct(idUser, productToAssociate.getIdProduct())){
            return cartrepository.findByUserIdAndProductId(idUser, productToAssociate.getIdProduct()).getQuantity();
        }
        return null;
    }

    public Boolean checkUserAndProduct(Long idUser, Long productID) throws ChartProductException, UserNotFoundByTokenException{
        if(idUser == null || productID == null){
            throw new ChartProductException("id o prodotto non valido");
        }

        User userInDb = userrepository.findById(idUser);

        if(userInDb == null){
            throw new UserNotFoundByTokenException();
        }
        return true;
    }

    //returning list of user product in cart
    public List<CartItemsDto> retrieveProductFromCart(Long userID) throws ChartProductException {

        List<CartItems> cartItems = cartrepository.findAllByUserId(userID);
        return  cartItems.stream()
                .map(s -> CartItemsDto
                        .builder()
                        .product(ProductDto.builder()
                            .name(s.getProduct().getName())
                            .price(s.getProduct().getPrice())
                            .description(s.getProduct().getDescription())
                            .category(s.getProduct().getCategory())
                            .region(s.getProduct().getRegion())
                            .productionDate(s.getProduct().getProductionDate().toString())
                            .id(s.getProductId()).build())
                        .quantity(s.getQuantity()).build())
                .collect(Collectors.toList());

//        if(userID == null){
//            throw new ChartProductException("id null");
//        }
//
//        return cartrepository.findByUserId(userID)
//                .stream()
//                .map(s -> ProductDto.builder()
//                        .id(s.getProduct().getId())
//                        .name(s.getProduct().getName())
//                        .description(s.getProduct().getDescription())
//                        .region(s.getProduct().getRegion())
//                        .productionDate(s.getProduct().getProductionDate().toString())
//                        .quantity(s.getQuantity())
//                        .build()).collect(Collectors.toList());
    }


    //removing one quantity of the product specified
    public void removeOne(Long id, Long productID) throws ChartProductException{
        if(id == null || productID == null){
            throw new ChartProductException("id o prodotto non valido");
        }

        CartItems chartUpdate = cartrepository.findByUserIdAndProductId(id, productID);
        BigInteger quantity = chartUpdate.getQuantity();
        chartUpdate.setQuantity(quantity.subtract(one));

        BigInteger newquantity = chartUpdate.getQuantity();

        if(newquantity.equals(0)){
            CartItems cartToRemove = cartrepository.findByUserIdAndProductId(id, chartUpdate.getProductId());
            cartrepository.delete(cartToRemove);
        } else {
            cartrepository.save(chartUpdate);
        }
    }

    //add one quantity to the product in the cart
    public void addOne(Long id, Long productID) throws ChartProductException{
        if(id == null || productID == null){
            throw new ChartProductException("id o prodotto non valido");
        }

        CartItems chartUpdate = cartrepository.findByUserIdAndProductId(id, productID);
        BigInteger quantity = chartUpdate.getQuantity();
        chartUpdate.setQuantity(quantity.add(one));

        cartrepository.save(chartUpdate);
    }

    //remove the product from the cart
    public void removeProduct(Long id, Long prodctID) throws ChartProductException{
        System.out.println("sono uscita dalla melma");
        System.out.println("id:" + id);
        System.out.println("prodctID:" + prodctID);
        if(id == null || prodctID == null){
            System.out.println("sicuro?");
            throw new ChartProductException("id o prodotto non valido");
        }
        System.out.println("aaaa");
        CartItems productToRemove = cartrepository.findByUserIdAndProductId(id, prodctID);
        System.out.println("bb");
        cartrepository.delete(productToRemove);
    }

    //empty the cart completely
    public void emptyCart(Long id) throws ChartProductException{
        if(id == null){
            throw new ChartProductException("id o prodotto non valido");
        }
        List<CartItems> cartToRemove = cartrepository.findAllByUserId(id);
        cartrepository.delete(cartToRemove);
    }


}
