$.ajax({
    url : "data/grammys.json",
    type : "GET",
    dataType : "json",
    success: function(data) {
      let new_html = "";
      data = data.fields
      console.log(data)
      for( let i = 0; i < data.length; i++) {
        new_html += `
          <option value="${data[i].field}">
            ${data[i].field}
          </option>
        `;
      }
      $("#category_types").append(new_html);
      loadInfo(data);
    },
    error: function(error_msg) {
      console.log(error_msg);
    }
  });

  function loadInfo(data){
      $('#category_types').on('change', function(event) {
        $('#nominees_section').empty();
          let value = $(this).val();
          for(let i = 0; i < data.length; i++) {
            if (value == data[i].field) {
                $('#title').text(data[i].field)
                $('p.description').text(data[i].description)
                loadCategories(data[i].categories)
            }
          }
      })
  }

  function loadCategories(categories) {
      let sub_titles = ""
      let cat_name = ""
      for (let index = 0; index < categories.length; index++) {
        cat_name = categories[index].category_name
        // let id = categories[index].category_id
        sub_titles += `<h3>${cat_name}</h3>`
        sub_titles += `<ul id = "${cat_name.replace(/ /g,'')}"></ul>`
        $('#nominees_section').append(sub_titles);
        sub_titles = ""
        createList(categories[index].nominees, cat_name.replace(/ /g,''), categories[index].winner_id)
        $(`#${cat_name.replace(/ /g,'')}`).append("<hr>")  
    }
  }

  function createList(nominees, cat_name, winner_id) {
    let elements = ""
    for (let index = 0; index < nominees.length; index++) {
        if (index == winner_id) {
            elements += `<li><h4 class = "winner">${nominees[index].nominee}</h4> <span>winner</span> </li> `
        } else {
            elements += `<li><h4>${nominees[index].nominee}</h4></li>`
        }
        elements += `<p>${nominees[index].artist}</p>`
        elements += `<p>${nominees[index].info}</p>`
    }
    $(`#${cat_name}`).append(elements)
  }