package it.digitalgarage.template.util;

import it.digitalgarage.template.util.exception.*;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.ApplicationEventPublisherAware;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.mail.MessagingException;

public abstract class GlobalExceptionHandler implements ApplicationEventPublisherAware {

	protected ApplicationEventPublisher eventPublisher;

	@Override
	public void setApplicationEventPublisher(ApplicationEventPublisher applicationEventPublisher) {
		this.eventPublisher = applicationEventPublisher;
	}

	@ResponseBody
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	@ExceptionHandler(Exception.class)
	public Response handleException(Exception e) {
		return new Response(
				ResponseEnum.GENERIC.code(),
				ResponseEnum.GENERIC.name(),
				e.getLocalizedMessage()
		);
	}

	@ResponseBody
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(UserAlreadyRegisterdException.class)
	public Response handleException(UserAlreadyRegisterdException e) {
		return new Response(
				ResponseEnum.EMAIL_ALREADY_REGISTERED.code(),
				ResponseEnum.EMAIL_ALREADY_REGISTERED.name(),
				e.getLocalizedMessage()
		);
	}

    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
    @ExceptionHandler(UserDtoNotAccordantException.class)
    public Response handleException(UserDtoNotAccordantException e) {
        return new Response(
                ResponseEnum.USERDTO_NOT_ACCORDANT.code(),
                ResponseEnum.USERDTO_NOT_ACCORDANT.name(),
                e.getLocalizedMessage()
        );
    }

	@ResponseBody
	@ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
	@ExceptionHandler(UserNotFoundByTokenException.class)
	public Response handleException(UserNotFoundByTokenException e) {
		return new Response(
				ResponseEnum.USER_NOT_FOUND_BY_TOKEN.code(),
				ResponseEnum.USER_NOT_FOUND_BY_TOKEN.name(),
				e.getLocalizedMessage()
		);
	}

	@ResponseBody
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ExceptionHandler(WrongCredentialsException.class)
	public Response handleException(WrongCredentialsException e) {
		return new Response(
				ResponseEnum.WRONG_CREDENTIALS.code(),
				ResponseEnum.WRONG_CREDENTIALS.name(),
				e.getLocalizedMessage()
		);
	}

	@ResponseBody
	@ResponseStatus(HttpStatus.UPGRADE_REQUIRED)
	@ExceptionHandler(TokenErrorException.class)
	public Response handleException(TokenErrorException e){
		return new Response(
				ResponseEnum.ERROR_TOKEN.code(),
				ResponseEnum.ERROR_TOKEN.name(),
				e.getLocalizedMessage()
		);
	}

	@ResponseBody
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ExceptionHandler(ProductNotFoundException.class)
	public Response handleException(ProductNotFoundException e){
		return new Response(
				ResponseEnum.PRODUCT_NOT_FOUND.code(),
				ResponseEnum.PRODUCT_NOT_FOUND.name(),
				e.getLocalizedMessage()
		);
	}

	@ResponseBody
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ExceptionHandler(ProductFilterException.class)
	public Response handleException(ProductFilterException e){
		return new Response(
				ResponseEnum.PRODUCT_FILTER_ERROR.code(),
				ResponseEnum.PRODUCT_FILTER_ERROR.name(),
				e.getLocalizedMessage()
		);
	}

	@ResponseBody
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(ProductNotInsertedException.class)
	public Response handleException(ProductNotInsertedException e){
		return new Response(
				ResponseEnum.PRODUCT_NOT_INSERTED.code(),
				ResponseEnum.PRODUCT_NOT_INSERTED.name(),
				e.getLocalizedMessage()
		);
	}

	@ResponseBody
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ExceptionHandler(UserNotFoundByEmailException.class)
	public Response handleException(UserNotFoundByEmailException e){
		return new Response(
				ResponseEnum.USER_NOT_FOUND_BY_EMAIL.code(),
				ResponseEnum.USER_NOT_FOUND_BY_EMAIL.name(),
				e.getLocalizedMessage()
		);
	}

	@ResponseBody
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(ChartProductException.class)
	public Response handleException(ChartProductException e){
		return new Response(
				ResponseEnum.PARAMETERS_NEEDED_FOR_CHART.code(),
				ResponseEnum.PARAMETERS_NEEDED_FOR_CHART.name(),
				e.getLocalizedMessage()
		);
	}

	@ResponseBody
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(UserNotActiveException.class)
	public Response handleException(UserNotActiveException e) {
		return new Response(
				ResponseEnum.USER_NOT_CONFIRMED.code(),
				ResponseEnum.USER_NOT_CONFIRMED.name(),
				e.getLocalizedMessage()
		);
	}

	@ResponseBody
	@ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
	@ExceptionHandler(CannotRemoveAdminUserException.class)
	public Response handleException(CannotRemoveAdminUserException e) {
		return new Response(
				ResponseEnum.CANNOT_REMOVE_ADMIN_USER.code(),
				ResponseEnum.CANNOT_REMOVE_ADMIN_USER.name(),
				e.getLocalizedMessage()
		);
	}

	@ResponseBody
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ExceptionHandler(RemoveUserException.class)
	public Response handleException(RemoveUserException e) {
		return new Response(
				ResponseEnum.CANNOT_REMOVE_USER.code(),
				ResponseEnum.CANNOT_REMOVE_USER.name(),
				e.getLocalizedMessage()
		);
	}

	@ResponseBody
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ExceptionHandler(UserNotFoundException.class)
	public Response handleException(UserNotFoundException e) {
		return new Response(
				ResponseEnum.USER_NOT_FOUND.code(),
				ResponseEnum.USER_NOT_FOUND.name(),
				e.getLocalizedMessage()
		);
	}

	@ResponseBody
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	@ExceptionHandler(MessagingException.class)
	public Response handleException(MessagingException e) {
		return new Response(
				ResponseEnum.MESSAGING_EXCEPTION.code(),
				ResponseEnum.MESSAGING_EXCEPTION.name(),
				e.getLocalizedMessage()
		);
	}

	@ResponseBody
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(WrongUserAnswerException.class)
	public Response handleException(WrongUserAnswerException e) {
		return new Response(
				ResponseEnum.WRONG_USER_ANSWER.code(),
				ResponseEnum.WRONG_USER_ANSWER.name(),
				e.getLocalizedMessage()
		);
	}

	@ResponseBody
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(UserAlreadyActiveException.class)
	public Response handleException(UserAlreadyActiveException e) {
		return new Response(
				ResponseEnum.USER_ALREADY_CONFIRMED.code(),
				ResponseEnum.USER_ALREADY_CONFIRMED.name(),
				e.getLocalizedMessage()
		);
	}

	@ResponseBody
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(UserNeverRequestRecoveryException.class)
	public Response handleException(UserNeverRequestRecoveryException e) {
		return new Response(
				ResponseEnum.USER_NEVER_REQUEST_RECOVERY.code(),
				ResponseEnum.USER_NEVER_REQUEST_RECOVERY.name(),
				e.getLocalizedMessage()
		);
	}



	@ResponseBody
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(FieldNotValidException.class)
	public Response handleException(FieldNotValidException e) {
		return new Response(
				ResponseEnum.WRONG_DATA.code(),
				ResponseEnum.WRONG_DATA.name(),
				e.getLocalizedMessage()
		);
	}


	@ResponseBody
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(QuantityNotMoreAvailableException.class)
	public Response handleException(QuantityNotMoreAvailableException e) {
		return new Response(
				ResponseEnum.NO_MORE_AVAILABILITY.code(),
				ResponseEnum.NO_MORE_AVAILABILITY.name(),
				e.getLocalizedMessage()
		);
	}
}
