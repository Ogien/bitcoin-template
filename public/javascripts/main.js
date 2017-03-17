/**
 * Created by aks on 2016-03-10.
 */
jQuery(document).ready( function($) {
  // -------------------------------
  // --------- Navigation ----------
  // -------------------------------

    var MQL = 1170;
    var mainHeader = $('.main-header'),
        mainNav = $('#nav-main'),
        mobileNav = $('#nav-main-mobile'),
        headerHeight = mainHeader.height();

    // Animation Helper built in jQuery
    $.fn.extend({
        animateStart: function (className) {
            var animationEnd = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
            $(this)
              .addClass(className)
              .one(animationEnd,
                function(){ $('body').addClass('overflow-hidden') });
        },
        animateEnd: function (className) {
            var animationEnd = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
            $(this)
              .removeClass(className)
              .one(animationEnd,
                function(){ $('body').removeClass('overflow-hidden') });
        },
        modal_visible: function() {
          $(this).on('click', function(event){
            $(event.target).is(mainNav) && mainNav.children('ul').toggleClass('is-visible');
          });
        },
        modal_signup: function() {
          $(this).on('click', '.signup', signup_selected);
        },
        modal_signin: function() {
          $(this).on('click', '.signin', login_selected);
        }
    });

    if($(window).width() > MQL) {
        $(window).on('scroll', {previousTop: 0},
            function () {
                var currentTop = $(window).scrollTop();

                if (currentTop < this.previousTop) {
                    if (currentTop > 0 && mainHeader.hasClass('is-fixed')) {
                        mainHeader.addClass('is-visible');
                    } else {
                        mainHeader.removeClass('is-visible is-fixed');
                    }
                } else {
                    mainHeader.removeClass('is-visible');

                    if (currentTop > headerHeight && !mainHeader.hasClass('is-fixed'))
                        mainHeader.addClass('is-fixed');
                }

                this.previousTop = currentTop;
            }
        );
    }

    // open/close main navigation
     $('.nav-mobile-trigger').on('click', function() {

        $('.menu-icon').toggleClass('is-clicked');
        mainHeader.toggleClass('menu-is-open');

        (mobileNav.hasClass('is-visible'))?
            mobileNav.animateEnd('is-visible'):
            mobileNav.animateStart('is-visible');
    });

    // --------------------------------
    // ---- Sign up/Sign In Modal -----
    // --------------------------------

    // init
    var formModal = $('.user-modal'),
		formLogin = formModal.find('#login'),
		formSignup = formModal.find('#signup'),
		formForgotPassword = formModal.find('#reset-password'),
		formModalTab = $('.switcher'),
		tabLogin = formModalTab.children('li').eq(0).children('a'),
		tabSignup = formModalTab.children('li').eq(1).children('a'),
		forgotPasswordLink = formLogin.find('.form-bottom-message a'),
		backToLoginLink = formForgotPassword.find('.form-bottom-message a');

    //- Enabling the modal and setting up the event
  	mainNav.modal_visible();
    mainNav.modal_signup();
  	mainNav.modal_signin();
    mobileNav.modal_visible();
  	mainHeader.modal_signin();
  	mobileNav.modal_signup();

  	formModal.on('click', function(event){
  		if( $(event.target).is(formModal) || $(event.target).is('.close-form') ) {
  			formModal.removeClass('is-visible');
  		}
  	});

  	$(document).keyup(function(event){
      	if(event.which=='27'){
      		formModal.removeClass('is-visible');
  	    }
      });

  	formModalTab.on('click', function(event) {
  		event.preventDefault();
  		( $(event.target).is( tabLogin ) ) ? login_selected() : signup_selected();
  	});

  	$('.hide-password').on('click', function(){
  		var togglePass= $(this),
  			passwordField = togglePass.prev('input');

  		( 'password' == passwordField.attr('type') ) ? passwordField.attr('type', 'text') : passwordField.attr('type', 'password');
  		( 'Hide' == togglePass.text() ) ? togglePass.text('Show') : togglePass.text('Hide');
  		//focus and move cursor to the end of input field
  		passwordField.putCursorAtEnd();
  	});

  	forgotPasswordLink.on('click', function(event){
  		event.preventDefault();
  		forgot_password_selected();
  	});

  	backToLoginLink.on('click', function(event){
  		event.preventDefault();
  		login_selected();
  	});

  	function login_selected(){
  		mainNav.children('ul').removeClass('is-visible');
  		formModal.addClass('is-visible');
  		formLogin.addClass('is-selected');
  		formSignup.removeClass('is-selected');
  		formForgotPassword.removeClass('is-selected');
  		tabLogin.addClass('selected');
  		tabSignup.removeClass('selected');
  	}

  	function signup_selected(){
  		mainNav.children('ul').removeClass('is-visible');
  		formModal.addClass('is-visible');
  		formLogin.removeClass('is-selected');
  		formSignup.addClass('is-selected');
  		formForgotPassword.removeClass('is-selected');
  		tabLogin.removeClass('selected');
  		tabSignup.addClass('selected');
  	}

  	function forgot_password_selected(){
  		formLogin.removeClass('is-selected');
  		formSignup.removeClass('is-selected');
  		formForgotPassword.addClass('is-selected');
  	}

  	//REMOVE THIS - it's just to show error messages
  	formLogin.find('input[type="submit"]').on('click', function(event){
  		event.preventDefault();
  		formLogin.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
  	});
  	formSignup.find('input[type="submit"]').on('click', function(event){
  		event.preventDefault();
  		formSignup.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
  	});


  	if(!Modernizr.input.placeholder){
  		$('[placeholder]').focus(function() {
  			var input = $(this);
  			if (input.val() == input.attr('placeholder')) {
  				input.val('');
  		  	}
  		}).blur(function() {
  		 	var input = $(this);
  		  	if (input.val() == '' || input.val() == input.attr('placeholder')) {
  				input.val(input.attr('placeholder'));
  		  	}
  		}).blur();
  		$('[placeholder]').parents('form').submit(function() {
  		  	$(this).find('[placeholder]').each(function() {
  				var input = $(this);
  				if (input.val() == input.attr('placeholder')) {
  			 		input.val('');
  				}
  		  	})
  		});
  	}

});

//- To deal with Opera & Chrome
jQuery.fn.putCursorAtEnd = function() {
	return this.each(function() {
    	if (this.setSelectionRange) {
      		var len = $(this).val().length * 2;
      		this.focus();
      		this.setSelectionRange(len, len);
    	} else {
      		$(this).val($(this).val());
    	}
	});
};
