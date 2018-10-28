var mainNav = document.querySelector('.main-nav')
var mainNavToggle = document.querySelector('.page-header__toggle')

mainNavToggle.addEventListener('click', function() {
  if (mainNav.classList.contains('main-nav--no-js') && mainNavToggle.classList.contains('page-header__toggle--no-js')) {
    mainNav.classList.remove('main-nav--no-js')
    mainNav.classList.add('main-nav--closed')
    mainNavToggle.classList.remove('page-header__toggle--no-js')
    mainNavToggle.classList.add('page-header__toggle--closed')
  } else {
    mainNav.classList.add('main-nav--no-js')
    mainNav.classList.remove('main-nav--closed')
    mainNavToggle.classList.add('page-header__toggle--no-js')
    mainNavToggle.classList.remove('page-header__toggle--closed')
  }
})
