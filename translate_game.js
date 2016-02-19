// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {
	var lang_to		= "English";
	var lang_from		= "Spanish";
	var current_dict	= dicts[lang_to][lang_from]; // keys: words in @lang_to, values: corresponding words in @lang_from
	var englishWords = Object.keys(current_dict);
	var index;
	var englishKey;
	var spanishValue;

	//Setting name of languages
	$("#langto").append(lang_to);

	$("#langfrom").append(lang_from);

	//focus on input as page loads
	$("#inputAnswer").focus();

	//generates random spanish word to be translated
	generateRandom();

	$('#inputAnswer').autocomplete({
		source: englishWords,
		minLength:2,
		select:function(event,ui){
			seeAnswer(ui.item.value);
			$(this).val("");
			return false;
		}
	}).keyup(function (e) {
        if(e.which === 13) {
            $(".ui-menu-item").hide();
        }
    });

	$(":button").click(function(){
		var input = $("#inputAnswer").val();
		if (input==""){
			input = "No Answer";
		}
		$('.static').remove();
		seeAnswer(input);
	})

	$(document).keypress(function(e) {
    if(e.which == 13) {
			var input = $("#inputAnswer").val();
			$("#inputAnswer").focus();
			if (input==""){
				input = "No Answer";
			}
			$('.static').remove();
			seeAnswer(input);
    }
	});

	//generates a random spanish word for translation
	function generateRandom(){
		index = Math.floor(Math.random()*Object.keys(current_dict).length);
		englishKey = Object.keys(current_dict)[index];
		spanishValue = current_dict[englishKey]
		$("#inputword").text(spanishValue);
		console.log(englishKey);
	}

	//checks user's answer and records it
	function checkAnswer(input){
		if ((input==Object.keys(current_dict)[index])){
			$(".column-left-content").prepend('<div class = "correct correct-spanish">' + spanishValue + '</div>');
			$(".column-right-content").prepend('<div class = "icon"><span class="ui-icon ui-icon-check"></span></div>');
			$(".column-center-content").prepend('<div class = "correct correct-english">' + input + '</div>');
		}else{
			$(".column-left-content").prepend('<div class = "incorrect incorrect-spanish">' + spanishValue + '</div>');
			$(".column-center-content").prepend('<div class = "incorrect incorrect-english">'+ input + '</div>');
			$(".column-right-content").prepend('<div class = "incorrect answer">'+ englishKey + '</div>');
		}
	}

	//performs See Answer functionality
	function seeAnswer(input){
		$("#inputAnswer").val("");

		checkAnswer(input);

		generateRandom();
	}
    });
