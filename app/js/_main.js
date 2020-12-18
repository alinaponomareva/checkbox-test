$(document).ready(function() {

  $('.select__dropdown-list').hide();

  $('.select__current').click(function(){
    $('.select__dropdown-list').toggle();
    $('.select__dropdown-list').addClass('select__dropdown-list--active');
    $('.select__arrow').toggleClass('select__arrow--active');
  });
  
  $('.select__dropdown-item').click(function(){
    $('.select__current').val($(this).html());
    $('.select__dropdown-item').removeClass('select__dropdown-item--active');
    $(this).addClass('select__dropdown-item--active');
    $('.select__dropdown-list').hide();
    $('.select__arrow').removeClass('select__arrow--active');
  });

  $('body').click(function(){
    if (!$('.select__current').is(':focus')) {
        $('.select__dropdown-list').hide();

        $('.select__arrow').removeClass('select__arrow--active');
    }           
  });
});
