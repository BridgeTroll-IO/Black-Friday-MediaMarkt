if( window.location.href.match(/mediamarkt.es/) ){


	addEventListener('DOMContentLoaded',function(){

		if( document.querySelector('#buyButtonBlock') ){
			var elem = document.querySelector('#buyButtonBlock');
		} else if( document.querySelector('#clickBuyButton') ){
			var elem = document.querySelector('#clickBuyButton');
		} else if( document.querySelector('#buyButton') ){
			var elem = document.querySelector('#buyButton');
		} else {
			return false;
		}

		var btn = document.createElement('DIV');
			btn.setAttribute('id', 'pdaButton');
			btn.setAttribute('class', 'priceInfoButton')

			btn.innerHTML = 'Comprobando...';
			if( elem.id === 'clickBuyButton' ){
				btn.style.clear = 'both';
				btn.style.marginBottom = '0';
				elem.parentNode.insertBefore(btn,elem);
			} else if( elem.id == 'buyButton' ){
				elem.parentNode.insertBefore(btn,elem);
			} else {
				elem.insertBefore(btn,elem.firstChild);
			}

	});

	addEventListener('load',function(e){
		if( document.querySelector('#priceBlock .mm-price .meta-bigprices') ){
			var price = document.querySelector('#priceBlock .mm-price .meta-bigprices').getAttribute('content');
		} else {
			var price = document.querySelector('.bigprices .meta-bigprices').getAttribute('content');
		}

		if( document.querySelector('#buyButtonBlock') ){
			var elem = document.querySelector('#buyButtonBlock');
		} else if( document.querySelector('#clickBuyButton') ){
			var elem = document.querySelector('#clickBuyButton');
			document.querySelector('.content__product.basic').style.overflow = 'auto';
		} else if( document.querySelector('#buyButton') ){
			var elem = document.querySelector('#buyButton');
		} else {
			 return false;
		}

		$ajax('https://preciodelahorro.com/api/get',{url: window.location.href, price: price},{
			'onEnd': function(json){
				response = JSON.parse(json);

				if( document.querySelector('#buyButtonBlock') ){
					var elem = document.querySelector('#buyButtonBlock');
				} else if( document.querySelector('#clickBuyButton') ){
					var elem = document.querySelector('#clickBuyButton');
					document.querySelector('.content__product.basic').style.overflow = 'auto';
				} else if( document.querySelector('#buyButton') ){
					var elem = document.querySelector('#buyButton');
				} else {
					 return false;
				}

				var btn = document.querySelector('#pdaButton');
				if( response.increase ){
					btn.style.backgroundColor = '#d51900';
					btn.innerHTML = '<i class="icon-warn"></i> Posible subida de precio';
				} else {
					btn.style.backgroundColor = '#2eb82e';
					btn.innerHTML = '<i class="icon-check"></i> No se ha detectado subida';
				}

				var msg = document.createElement('DIV');
				msg.setAttribute('id', 'priceInfoMsg');
				msg.setAttribute('class','priceInfoMsg');
				msg.style.display = 'none';

				var tableHtml = '<table><thead><tr><th>Día</th><th>Precio</th></thead>';
				for( day in response.prices ){
					var price = response.prices[day];
					var date = day.replace(/^([0-9]{4})([0-9]{2})([0-9]{2})$/,'$3-$2-$1');
					tableHtml = tableHtml + '<tr><td class="price' + day + '">' + date + '</td><td class="price' + day + ' price">' + price + '€</td></tr>';
				}
				tableHtml = tableHtml + '</table>';
				tableHtml = tableHtml + '<a href="' + response.pdaURL + '" target="_blank" class="priceInfoButton">Ver histórico completo</a>';
				msg.innerHTML = tableHtml;
				if( document.querySelector('#buyButtonBlockNormal') ){
					console.log('1')
					elem.insertBefore(msg, document.querySelector('#buyButtonBlockNormal'));
				} else if( document.querySelector('#buyButtonBlockCampaign') ){
					console.log('2')
					elem.insertBefore(msg, document.querySelector('#buyButtonBlockCampaign'));
				} else if( document.querySelector('#buyButton') ){
					console.log('3')
					elem.parentNode.insertBefore(msg, document.querySelector('#buyButton'));
				} else if( document.querySelector('#clickBuyButton') ){
					console.log('4')
					msg.style.width = 'calc(100% - 16px)';
					msg.style.marginTop = '10px';
					elem.parentNode.insertBefore(msg, document.querySelector('#clickBuyButton'));
				}

				for( k in response.variations ){
					var variation = response.variations[k];

					if( variation.type === 'increase' ){
						var priceCells = document.querySelectorAll('.price' + variation.day);
						priceCells.forEach(function(priceCell){
							priceCell.style.backgroundColor = '#d51900';
							priceCell.style.color = '#fff';
						});
					} else if( variation.type === 'decrease' ){
						var priceCell = document.querySelector('.price.price' + variation.day);
						priceCell.innerHTML = '<i class="icon-down downArrow"></i>' + priceCell.innerHTML;
					}
				}

				btn.addEventListener('click',function(){
					if( msg.style.display === 'none' ){
						msg.style.display = 'block';
					} else {
						msg.style.display = 'none';
					}
				});
			}
		});
	});
}