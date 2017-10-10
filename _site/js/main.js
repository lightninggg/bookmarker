//Listen Form submit
document.getElementById("myForm").addEventListener('submit',saveBookmark);

function saveBookmark(e){
	//save marks
	// console.log('It works');

	//get values
	var siteName = document.getElementById('siteName').value;
	var siteURL = document.getElementById('siteURL').value;

	if(!validateForm(siteName,siteURL)){
		return false;
	}
	
	var bookmark = {
		name: siteName,
		url: siteURL
	}

	//local Storage Test
/*	localStorage.setItem('test', 'Hello World');
	console.log(localStorage.getItem('test'));
	localStorage.removeItem('test');
	console.log(localStorage.getItem('test'));*/
	// console.log(bookmark);
	//Prevent form from submitting
	//
	
	//test if bm is null
	if(localStorage.getItem('bookmarks') === null){
		//Init
		var bookmarks = [];
		//Add to array
		bookmarks.push(bookmark);
		//set
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));//JSON.stringify(bookmarks)
	} 

	else{
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		//add to Array
		bookmarks.push(bookmark);
		//Reset back to Storage
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	}	

	//clear Form
	document.getElementById('myForm').reset();
	
	fetchBookmarks();
	e.preventDefault();
}	

	
	function deleteBookmark(url){
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

		//LOOp bookmarks
		for(var i=0;i<bookmarks.length;i++){
			if(bookmarks[i].url == url){
				bookmarks.splice(i,1);
			}
		}
		//Reset bookmarks
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
		//Refetch bookmarks
		fetchBookmarks();
	}

	function fetchBookmarks(){
			var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
			//fetch id
			var bookmarkResults = document.getElementById('bookmarkResults');

			//Build output
			//
			bookmarkResults.innerHTML = ' ';
			
			for(var i = 0;i<bookmarks.length;i++){
				var name = bookmarks[i].name;
				var url = bookmarks[i].url;

				bookmarkResults.innerHTML += '<div class="well">'+
											  '<h3>'+name+
											  '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
											  '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'
											  '</h3>'+
											  '</div>';
			}
		}

		

		//validate Form
		function validateForm(siteName,siteURL) {
			if(!siteName || !siteURL){
				alert('Please fill in this form');
				return false;
			}
			var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
			var regex = new RegExp(expression);

			if(!siteURL.match(regex)){
				alert('Please use a valid URL');
				return false;
			}
			return true;
		}