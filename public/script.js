$(() => {
   $('.shopBtn').on('click', () => {
      $('.side-menu')[0].scrollIntoView({behavior: 'smooth'});
      $('.side-menu').addClass('is-active')
   })
})
