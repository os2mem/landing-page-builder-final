let dropdownButton = $('#profile-option-dropdown-button');

  dropdownButton.click( e => {
    let dropdown = $('#dashboard-profile-dropdown');
    if (dropdown.hasClass('active')) {
      dropdown.removeClass('active');
    } else {
     dropdown.addClass('active'); 
    }
  });


