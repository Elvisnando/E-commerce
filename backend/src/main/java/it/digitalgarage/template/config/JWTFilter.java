package it.digitalgarage.template.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

public class JWTFilter extends GenericFilterBean {

    private static final String AUTHORIZATION_HEADER = "Authorization";

    private static String secretKey;

    static {
        Properties prop = new Properties();
        InputStream input = null;
        try {
            String path = Thread.currentThread().getContextClassLoader().getResource("").getPath();
            input = new FileInputStream(path + "application.properties");
            prop.load(input);
            secretKey = prop.getProperty("security.jwt.secret-key");
        } catch (IOException ex) {
            ex.printStackTrace();
        } finally {
            if (input != null) {
                try {
                    input.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    @Override
    public void doFilter(ServletRequest servletRequest,
                         ServletResponse servletResponse,
                         FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        String token = request.getHeader(AUTHORIZATION_HEADER);
        if (token == null || !token.startsWith("Bearer ")) {
            ((HttpServletResponse) servletResponse).sendError(
                    HttpServletResponse.SC_UNAUTHORIZED,
                    "Invalid Authorization header."
            );
        } else {
            try {

                Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token.substring(7)).getBody();
                request.setAttribute("claims", claims);
                SecurityContextHolder.getContext().setAuthentication(getAuthentication(claims));
                filterChain.doFilter(servletRequest, servletResponse);
            } catch (SignatureException e) {
                ((HttpServletResponse) servletResponse).sendError(
                        HttpServletResponse.SC_UNAUTHORIZED,
                        "Invalid token"
                );
            }
        }
    }

//    private Authentication getAuthentication(Claims claims) {
//        System.out.println("get authentication");
//        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
//        String role = (String) claims.get("role");
//        authorities.add(new SimpleGrantedAuthority(role));
//        User principal = new User(claims.getSubject(), "", authorities);
//        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
//    }


    private Authentication getAuthentication(Claims claims) {
        System.out.println("get authentication");
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        String role = (String) claims.get("name");
        authorities.add(new SimpleGrantedAuthority(role));
        User principal = new User(claims.getSubject(), "", authorities);
        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

}