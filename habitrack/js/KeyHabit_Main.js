var FilterEnum = Object.freeze({ 'none': 0, 'name': 1, 'descri': 2, 'crdate': 3, 'eddate': 4 });
// Action Enum
var LastSearch = {
_lastSearchId: 0,
_lastSearchValue: 'none',
// GetCurrentActionIndex
get LastSearchId() {
    return this._lastSearch;
},
get LastSearchLink() {
    var string = '/habitrack/Private/Controller/MySql/KeyHabit/KeyHabit_SelectAll.php';
    // name
    if (this._lastSearchId == 1)
    string += '?' + $.param({ name: this._lastSearchValue });
    // description
    else if (this._lastSearchId == 2)
    string += '?' + $.param({ description: this._lastSearchValue });
    // creationdate
    else if (this._lastSearchId == 3)
    string += '?' + $.param({ creationdate: this._lastSearchValue });
    // editdate
    else if (this._lastSearchId == 4)
    string += '?' + $.param({ editdate: this._lastSearchValue });
    
    return string;
},
// SetCurrentAction
set LastSearchId(value) {
    this._lastSearchId = value;
},

get LastSearchValue() {
    return this._lastSearchValue;
},
set LastSearchValue(value) {
    this._lastSearchValue = value;
}
};

$(document).ready(function(){
    // Search
    


    /* Search button */
    searchHabitBtn_onclick();
    function searchHabitBtn_onclick() {
        document.getElementById('keyHabit_SearchBtn').addEventListener("click", Action);

        function Action() {
            LastSearch.LastSearchId = document.getElementById('keyHabit_FilterType').selectedIndex;
            LastSearch.LastSearchValue = $('#keyHabit_FilterValue').val();
            $('#KeyHabit_List').load(LastSearch.LastSearchLink);
        }
    }

    /* keyHabit_FilterType  select */
    filterTypeSel_onchange();
    function filterTypeSel_onchange() {
        document.getElementById('keyHabit_FilterType').addEventListener("change", Action);

        function Action() {
            if (document.getElementById('keyHabit_FilterType').selectedIndex <= 0) {
                document.getElementById('keyHabit_FilterValue').type = 'text';
                document.getElementById('keyHabit_FilterValue').readOnly = true;
                document.getElementById('keyHabit_FilterValue').value = '';
                return;
            }
            else if (document.getElementById('keyHabit_FilterType').selectedIndex == 3 || document.getElementById('keyHabit_FilterType').selectedIndex == 4) {
                document.getElementById('keyHabit_FilterValue').type = 'date';
            } else {
                if (document.getElementById('keyHabit_FilterValue').type == 'date') {
                    document.getElementById('keyHabit_FilterValue').value = '';
                }
                document.getElementById('keyHabit_FilterValue').type = 'text';
            }
            document.getElementById('keyHabit_FilterValue').readOnly = false;
        }
    }

});