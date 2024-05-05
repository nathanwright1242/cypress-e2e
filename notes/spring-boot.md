```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationEntryPoint;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .cors().and()
            .headers().contentSecurityPolicy("script-src 'self'").and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
            .csrf().disable()
            .authorizeHttpRequests(authz -> {
                authz
                    .requestMatchers()
                        .antMatchers("/api/**")
                        .antMatchers("/admin/**") // Add additional request matchers here
                        .and()
                    .authorizeRequests()
                        .antMatchers("/api/**").authenticated()
                        .antMatchers("/admin/**").hasRole("ADMIN") // Define access rules for each matcher
                        .and()
                    .exceptionHandling()
                        .accessDeniedHandler(accessDeniedHandler())
                        .authenticationEntryPoint(authenticationEntryPoint());
            });
    }

    @Bean
    public AccessDeniedHandler accessDeniedHandler() {
        return (request, response, accessDeniedException) -> {
            // Handle access denied exception
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Access Denied");
        };
    }

    @Bean
    public AuthenticationEntryPoint authenticationEntryPoint() {
        return (request, response, authException) -> {
            // Handle authentication failure
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authentication Failed");
        };
    }
}

```
