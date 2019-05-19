$(document).ready(function(){
  // VARIABLES

  // selectedIndex
  var SelectedIndex = {
    _index: -1,
    _originalName: "",
    _originalDescri: "",
    // GetIndex
    get Index() {
      return this._index;
    },

    // SetIndex
    set Index(value) {
      this._index = value;
    },

    // OriginalName
    get OriginalName() {
      return this._originalName;
    },
    set OriginalName(value) {
      this._originalName = value;
    },

    // OriginalDescri
    get OriginalDescri() {
      return this._originalDescri;
    },
    set OriginalDescri(value) {
      this._originalDescri = value;
    }
  };

  function SetSelectedIndex(index) {
    SelectedIndex.Index = index;
    SelectedIndex.Name = '';
    SelectedIndex.Descri = '';
  }

  function SetSelectedIndex(index, name, descri) {
    SelectedIndex.Index = index;
    SelectedIndex.OriginalName = name;
    SelectedIndex.OriginalDescri = descri;
  }

  // currentAction
  var ActionEnum = Object.freeze({ 'null': 0, 'add': 1, 'edit': 2, 'remove': 3, 'cancel': 4 , 'streakReset': 5});

  // Get Properties Amount
  function ObjectLength(object) {
    var length = 0;
    for (var key in object) {
      if (object.hasOwnProperty(key)){
        ++length;
      }
    }
    return length;
  }

  // GetActionEnumIndex
  function GetActionEnumIndex(value) {
    for (var i = 0; i < ObjectLength(Action); i++) {
      if (ActionEnum[i] == value){
        return i;
      }
    }
  };

  // GetActionEnumValue
  function GetActionEnumValue(index) {
    return ActionEnum[index];
  };
  
  // Action Enum
  var CurrentAction = {
    _current: 0,
    // GetCurrentActionIndex
    get CurrentActionIndex() {
      return this._current;
    },
    // GetCurrentActionValue
    get CurrentActionValue() {
      GetActionEnumValue(this._current);
    },
    // SetCurrentAction
    set CurrentActionIndex(index) {
      this._current = index;
    }
  };

  // EDIT
  var editButtons = document.getElementsByClassName('editHabitBtn');
  Array.from(editButtons).forEach(editHabitBtn_onclick);

  function editHabitBtn_onclick(currentValue, index) {
    currentValue.addEventListener("click", Action);
    
    function Action(){
      if ((SelectedIndex.Index > -1 && SelectedIndex.Index != index)  || CurrentAction.CurrentActionIndex == 1){
        ResetAllFields();
      }
      var tempScrollTop = $(window).scrollTop();
      CurrentAction.CurrentActionIndex = 2;
      SetSelectedIndex(index, document.getElementsByClassName('kha_name')[index].value, document.getElementsByClassName('kha_descri')[index].value);
      // Fields
      document.getElementsByClassName('kha_name')[index].readOnly = false;
      document.getElementsByClassName('kha_descri')[index].readOnly = false;
      // Toggle buttons
      document.getElementsByClassName('editHabitBtn')[index].style = 'display: none;';
      document.getElementsByClassName('removeHabitBtn')[index].style = 'display: none;';
      document.getElementsByClassName('streakUpBtn')[index].style = 'display: none;';
      document.getElementsByClassName('streakResetBtn')[index].style = 'display: none;';
      document.getElementsByClassName('saveHabitBtn')[index].style = 'display: inline-block;';
      document.getElementsByClassName('cancelHabitBtn')[index].style = 'display: inline-block;';
    }
  }

  // SAVE
  var saveButtons = document.getElementsByClassName('saveHabitBtn');
  Array.from(saveButtons).forEach(saveHabitBtn_onclick);

  function saveHabitBtn_onclick(currentValue, index) {
    currentValue.addEventListener("click", Action);
    
    function Action(){
      if (CurrentAction.CurrentActionIndex == 2) {
        // Edit
          var currentName = document.getElementsByClassName('kha_name')[index].value;
          var currentDescri = document.getElementsByClassName('kha_descri')[index].value;

          if (currentName.length > 0){
            $.ajax({
              url: '/habitrack/Private/Controller/MySql/KeyHabit/KeyHabit_Update.php',
              type: 'post',
              data: {
                kha_identi: document.getElementsByClassName('keyhabit_row')[index].getAttribute('value'),
                kha_name: currentName,
                kha_descri: currentDescri
              },
              success: function(data, textStatus, jQxhr) {
                Refresh();
              },
              error: function (jqXHR, exception) {
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connected.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                SetLog('Error: ' + msg);
          }
            });
          } else {
            alert('You must insert a key habit name');
          } 
      } else if (CurrentAction.CurrentActionIndex == 3) {
        // Remove
        $.ajax({
          url: '/habitrack/Private/Controller/MySql/KeyHabit/KeyHabit_Delete.php',
          type: 'post',
          data: {
            kha_identi: document.getElementsByClassName('keyhabit_row')[index].getAttribute('value')
          },
          success: function(data, textStatus, jQxhr) {
            // ResetFields(index);
            // alert('Habit removed successfully. Refresh the page to see changes.');
            Refresh();
          },
          error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connected.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            SetLog('Error: ' + msg);
          }
        });
      // Reset Action
      } else if (CurrentAction.CurrentActionIndex == 5) {
        $.ajax({
          url: '/habitrack/Private/Controller/MySql/KeyHabit/KeyHabit_StreakReset.php',
          type: 'post',
          data: {
            kha_identi: document.getElementsByClassName('keyhabit_row')[index].getAttribute('value')
          },
          success: function(data, textStatus, jQxhr) {
            Refresh();
          },
          error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connected.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            SetLog('Error: ' + msg);
          }
        });
      // Add Action
      } else if (CurrentAction.CurrentActionIndex == 1) {
        if ($('.newHabit_name').val().length > 0){
          $.ajax({
            url: '/habitrack/Private/Controller/MySql/KeyHabit/KeyHabit_AddNew.php',
            type: 'post',
            data: {
              kha_name: $('.newHabit_name').val(),
              kha_descri: $('.newHabit_descri').val(),
              kha_streak: $('.newHabit_streak').val()
            },
            success: function(data, textStatus, jQxhr) {
              Refresh();
            },
            error: function (jqXHR, exception) {
              var msg = '';
              if (jqXHR.status === 0) {
                  msg = 'Not connected.\n Verify Network.';
              } else if (jqXHR.status == 404) {
                  msg = 'Requested page not found. [404]';
              } else if (jqXHR.status == 500) {
                  msg = 'Internal Server Error [500].';
              } else if (exception === 'parsererror') {
                  msg = 'Requested JSON parse failed.';
              } else if (exception === 'timeout') {
                  msg = 'Time out error.';
              } else if (exception === 'abort') {
                  msg = 'Ajax request aborted.';
              } else {
                  msg = 'Uncaught Error.\n' + jqXHR.responseText;
              }
              alert('Error:\n' + msg);
            }
          });
      }
     } else {
        alert('Current Action = ' + CurrentAction.CurrentActionIndex);
      }
    }
  }

  // REMOVE
  var removeButtons = document.getElementsByClassName('removeHabitBtn');
  Array.from(removeButtons).forEach(removeHabitBtn_onclick);

  function removeHabitBtn_onclick(currentValue, index) {
    currentValue.addEventListener("click", Action);
    
    function Action(){
      if ((SelectedIndex.Index > -1 && SelectedIndex.Index != index) || CurrentAction.CurrentActionIndex == 1){
        ResetAllFields();
      }
      CurrentAction.CurrentActionIndex = 3;
      SetSelectedIndex(index, document.getElementsByClassName('kha_name')[index].value, document.getElementsByClassName('kha_descri')[index].value);
      // Toggle buttons
      document.getElementsByClassName('editHabitBtn')[index].style = 'display: none;';
      document.getElementsByClassName('removeHabitBtn')[index].style = 'display: none;';
      document.getElementsByClassName('streakUpBtn')[index].style = 'display: none;';
      document.getElementsByClassName('streakResetBtn')[index].style = 'display: none;';
      document.getElementsByClassName('saveHabitBtn')[index].style = 'display: inline-block;';
      document.getElementsByClassName('cancelHabitBtn')[index].style = 'display: inline-block;';
    }
  }
  
  // CANCEL
  var cancelButtons = document.getElementsByClassName('cancelHabitBtn');
  Array.from(cancelButtons).forEach(cancelHabitBtn_onclick);

  function cancelHabitBtn_onclick(currentValue, index) {
    currentValue.addEventListener("click", Action);
    
    function Action(){
      ResetFields(index);

      SetSelectedIndex(-1);
      CurrentAction.CurrentActionIndex = 0;
    }
  }

  function ResetFields(index) {
    document.getElementsByClassName('addHabitBtn')[document.getElementsByClassName('addHabitBtn').length - 1].style = 'display: inline-block;';
    document.getElementsByClassName('saveHabitBtn')[document.getElementsByClassName('saveHabitBtn').length - 1].style = 'display: none;';
    document.getElementsByClassName('cancelHabitBtn')[document.getElementsByClassName('cancelHabitBtn').length - 1].style = 'display: none;';
    

    // Other action other than add row
    if (CurrentAction.CurrentActionIndex != 1){
      // Fields
      document.getElementsByClassName('kha_name')[index].readOnly = true;
      document.getElementsByClassName('kha_descri')[index].readOnly = true;
      // Toggle buttons
      document.getElementsByClassName('editHabitBtn')[index].style = 'display: inline-block;';
      document.getElementsByClassName('removeHabitBtn')[index].style = 'display: inline-block;';
      document.getElementsByClassName('streakUpBtn')[index].style = 'display: inline-block;';
      document.getElementsByClassName('streakResetBtn')[index].style = 'display: inline-block;';
      document.getElementsByClassName('saveHabitBtn')[index].style = 'display: none;';
      document.getElementsByClassName('cancelHabitBtn')[index].style = 'display: none;';

      document.getElementsByClassName('kha_name')[SelectedIndex.Index].value = SelectedIndex.OriginalName;
      document.getElementsByClassName('kha_descri')[SelectedIndex.Index].value = SelectedIndex.OriginalDescri;
    } else {
      document.getElementsByClassName('newHabit_name')[0].readOnly = true;
      document.getElementsByClassName('newHabit_descri')[0].readOnly = true;
      document.getElementsByClassName('newHabit_streak')[0].style = 'visibility: hidden;';
      
      document.getElementsByClassName('newHabit_name')[0].value = '';
      document.getElementsByClassName('newHabit_descri')[0].value = '';
    }
  }

  function ResetAllFields() {
    // alert('reseting');
    for (var i = 0; i < editButtons.length; i++) {
      ResetFields(i);
    }
    
    SelectedIndex.Index = -1;
    CurrentAction.CurrentActionIndex = 0;
  }
  
  

  /* Refresh uses the last made search */
  function Refresh() {
    /* this piece of shit may be causing stuff to be inserted multiple times when filtered
    Edit: may be fixed, but watch it close */
    $('#KeyHabit_List').load(LastSearch.LastSearchLink);
  }

  /* Add row */
  addHabitBtn_onclick(document.getElementsByClassName('addHabitBtn')[document.getElementsByClassName('addHabitBtn').length - 1]);

  function addHabitBtn_onclick(currentValue) {
    currentValue.addEventListener("click", Action);
    var index = (document.getElementsByClassName('actioncolumn').length) - 1;

    function Action() {
      if ((SelectedIndex.Index > -1 && SelectedIndex.Index != (document.getElementsByClassName('saveHabitBtn').length - 1)) || CurrentAction.CurrentActionIndex == 1){
        ResetAllFields();
      }
      
      CurrentAction.CurrentActionIndex = 1;
      SelectedIndex.Index = -1;

      document.getElementsByClassName('addHabitBtn')[0].style = 'display: none;';
      document.getElementsByClassName('saveHabitBtn')[index].style = 'display: inline-block;';
      document.getElementsByClassName('cancelHabitBtn')[index].style = 'display: inline-block;';
    
      document.getElementsByClassName('newHabit_name')[0].readOnly = false;
      document.getElementsByClassName('newHabit_descri')[0].readOnly = false;
      document.getElementsByClassName('newHabit_streak')[0].readOnly = false;
      document.getElementsByClassName('newHabit_streak')[0].style = 'visibility: visible';
      document.getElementsByClassName('newHabit_streak')[0].value = '0';
    }
  }

  /* Streak buttons */
  /* Increase */
  var streakUpButtons = document.getElementsByClassName('streakUpBtn');
  Array.from(streakUpButtons).forEach(streakUpBtn_onclick);
  function streakUpBtn_onclick(currentValue, index) {
    currentValue.addEventListener("click", Action);

    function Action() {
      // Edit
        $.ajax({
          url: '/habitrack/Private/Controller/MySql/KeyHabit/KeyHabit_StreakUp.php',
          type: 'post',
          data: {
            kha_identi: document.getElementsByClassName('keyhabit_row')[index].getAttribute('value')
          },
          success: function(data, textStatus, jQxhr) {
            Refresh();
          },
          error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connected.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            SetLog('Error: ' + msg);
        }
      });
    }
  }

  /* Reset */
  var streakResetButtons = document.getElementsByClassName('streakResetBtn');
  Array.from(streakResetButtons).forEach(streakResetBtn_onclick);
  function streakResetBtn_onclick(currentValue, index) {
    currentValue.addEventListener("click", Action);

    function Action() {
      // Edit
      if ((SelectedIndex.Index > -1 && SelectedIndex.Index != index)  || CurrentAction.CurrentActionIndex == 1){
        ResetAllFields();
      }
      var tempScrollTop = $(window).scrollTop();
      CurrentAction.CurrentActionIndex = 5;
      SetSelectedIndex(index, document.getElementsByClassName('kha_name')[index].value, document.getElementsByClassName('kha_descri')[index].value);
      // Toggle buttons
      document.getElementsByClassName('editHabitBtn')[index].style = 'display: none;';
      document.getElementsByClassName('removeHabitBtn')[index].style = 'display: none;';
      document.getElementsByClassName('streakUpBtn')[index].style = 'display: none;';
      document.getElementsByClassName('streakResetBtn')[index].style = 'display: none;';
      document.getElementsByClassName('saveHabitBtn')[index].style = 'display: inline-block;';
      document.getElementsByClassName('cancelHabitBtn')[index].style = 'display: inline-block;';
    }
  }

});