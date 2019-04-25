package it.digitalgarage.template.config;

import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configurable
@EnableWebSecurity
public class Security extends WebSecurityConfigurerAdapter {

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //super.configure(http);
        http
                .authorizeRequests()
                .anyRequest()
                .fullyAuthenticated()
                .and()
                .addFilterBefore(new JWTFilter(), UsernamePasswordAuthenticationFilter.class)
                .httpBasic()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .securityContext()
                .and()
                .csrf()
                .disable();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers(
                "/",
                "/html/**",
                "/swagger-ui.html",
                "/index.html",
                "/css/**",
                "/swagger-resources/**",
                "/v2/api-docs",
                "/configuration/security",
                "/webjars/**",
                "/js/**",
                "/img/**",
                "/fonts/**",
                "/user/login",
                "/user/register",
                //"/user/registrationConfirm",
                //"/user/resetPasswordConfirm",
                "/user/resendVerificationEmail",
                "/user/resetPassword",
                "/login/authenticate",
                "/demo/add",
                "/registration/**",
                "/sendConfirm-email",
                "/search",
                "/registration/addUser",
                "/forget/password",
                "/ProductsBylocation",
                //to remove the admin url
                "/admin/authenticate",
                "/admin/addUser",
                "/admin/removeUser",
                "/admin/addNewProduct",
                "/admin/removeProduct",
                "/searchProductsByFilter",
                "/admin/listProducts",
                "/admin/users",
                //to remove admin url
                "/sample",
                "/getImage",
                "/forget/reset",
                "/forget/password",
                "/searchProductsOwner",
                "/searchProductByName",
                "/blockchain/blockNumber",
                "/blockchain/account",
                "/blockchain/numTransaction",
                "/blockchain/getBalance",
                "/blockchain/deploy",
                "/blockchain/test",
                "/blockchain/buyToken",
                "/searchQuantityProduct",
                "/productDetails"
        );
    }
}




