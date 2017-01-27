			<script language="javascript">
			var tab_images=new Array(12);//déclaration tableau d'images
			var tab_jeu=new Array();//déclaration des cartes, tableau d'images x2 mélangées
			var imagedos=new Image();//déclaration image de dos
			imagedos.src="cartes/imagedos.jpg";//addresse image de dos
			var affectcarte=new Array();//déclaration tableau d'affectation des cartes dos/face
			var paire=0;//compte les paires
			var temp=1000;//base du temps
			var nbcoup=0;//nombre de click
			var ind1=0;//enregistre indice n°1
			var ind2=0;//enregistre indice n°2
			var gagne=0;//compteur victoire
			var redist="";//déclaration enrgistrement addresse pour redistribution 
			var testaff=0;//déclaration teste affichage
			var gagnePartie=0;//00000000000000000000000000000000000000000000
			function preload(){//prechargement des images cachées
				obj_image=new Image();//déclaration image
				for(var i=0;i<tab_images.length;i++){
					var numImg=i+1;//nom des fichiers de 1 à 12
					tab_images[i]="cartes/image"+numImg+".jpeg";//déclaration des addresse des images
					obj_image.src=tab_images[i];
				}
				tab_jeu = melange(tab_images.concat(tab_images));//melange des cartes tableau d'images x2
				nbcartes=tab_jeu.length;//nombre de cartes à distribuer
			}
			function melange(tablo){//melange des images
				var i = tablo.length;//enregistrement du nombre de cartes 
				if (i == 0){//si nombre de carte est égale à 0 le melange s'arrete
					return false;
				}  
				 while (i--) {//le nombre de carte à melanger est diminué de 1
					var j = Math.floor(Math.random() * (i + 1));//valeur aleatoire compris dans le nombre de cartes restants à mélenger
					var tempi=tablo[i];//enregistrement de la derniere case
					var tempj=tablo[j];//enregistrement de la case aléatoire
					tablo[i]=tempj;//placement à la fin de la case aléatoire
					tablo[j]=tempi;//placement de laderniere case à la place de la case aléatoire
				}

				return(tablo);//retourne le tablo
			}
			function distrib(){//distribution des cartes faces cachées
				for(var i=0;i<nbcartes;i++){//distribution du nombre de carte
					affectcarte[i]="dos";//affectation du nom dos aux cartes
					document.write("<a href=\"javascript:testimages("+i+")\" ><img src=\"cartes/imagedos.jpg\" name=\"dos"+i+"\"/></a>");//affichage des cartes de dos avec lien javascript pour teste d'image
				}
				redist=document.getElementById('affich').innerHTML;//récupération du contenu du calque affichage
			}
			function redistrib(){//redistribution des cartes
				preload();//prechargement et mélange des cartes
				difficult();//choix de la difficulté
				gagne=0;//compteur à zéro
				nbcoup=0;//compteur à zéro
				document.getElementById("affich_text").innerHTML="<p>Vous pouvez joué à nouveau !</p>";//affichage d'un nouveau texte
				for(var i=0;i<nbcartes;i++){//distribution du nombre de carte
					affectcarte[i]="dos";//affectation du nom dos aux cartes
					document.getElementById('affich').innerHTML=redist;//réécriture du contenu du calque affichage
				}
			}
			function difficult(){//choisir une difficulté
				var val=document.forms["rd"].elements["diff"].value;//récupération de la valeur de select>diff
				temp=1000*val;//multiplication de la valeur par le temp de base
			}
			function tournecarte(indice,add){//tourne la carte correspondante à l'indice, affiche l'addresse de l'image 
				var nomind="dos"+indice;// nom de limage à modifier
				document.images[nomind].src=add;//modifi l'addresse de l'objet images
			}
			function testimages(ind){//fonction principale de clic sur une image
				if((tab_jeu[ind]==-1)||(affectcarte[ind]=="face")){//teste de l'image si l'image est trouvée ou si la carte est retournée
					alert('Choisir une autre image ! ');//boite d'alerte
					}else{
					if(testaff==0){//teste si l'imge cliquée est la premiere
					affectcarte[ind]="face";//affect face à la carte, retourne la carte
						testaff=1;//clic la premiere image
						ind1=ind;//sauve la position de la 1er carte cliquée
						tournecarte(ind,tab_jeu[ind]);//affiche l'image correspondante à la carte
					}else if(testaff==1){
						ind2=ind;//sauve la position de la 2eme carte cliquée
						tournecarte(ind,tab_jeu[ind]);//affiche l'image correspondante à la carte
						if(tab_jeu[ind1]==tab_jeu[ind2]){//teste si les 2 images sont identiques
							gagne++;//compteur victoire ajoute 1
							if(gagne>1){//teste pour ajouté un s à paire suivant une ou plusieurs paires trouvées
								s="s";
							}else{
								s="";
							}
							document.getElementById("affich_text").innerHTML="<p>"+gagne+" paire"+s+" trouvée"+s+"</p>";//affiche le nombre de paires trouvées
							tab_jeu[ind1]=-1;//affect que la 1er image est trouvée
							tab_jeu[ind2]=-1;//affect que la 2eme image est trouvée
							if(gagne==tab_images.length){//teste si le nombre paires trouvées est égale au nombre total de paires à trouver
								alert("Bravo vous avez gagné en "+nbcoup+" clics !!!");//affiche la victoire et le nombre de coups
								document.enrscore.envoiscore.value=nbcoup;//0000000000000000000000000000000000000000000
							document.getElementById("affich_text").innerHTML="<p>Bravo "+gagne+" paires trouvées en "+nbcoup+"! tu peu enregistrer ton score</p>";//affiche la victoir
							}
						}else{//les 2 cartes ne sont pas identiques
					affectcarte[ind1]="dos";//affect dos à la carte, cache la carte
							document.getElementById("affich_text").innerHTML="<p>ce n'est pas un bonne paire !</p>";//affiche l'echeque dans le calque affich_text
							tempo=setTimeout(//temporisation, cache les 2 cartes retournées suivant le temps déterminé
"tournecarte("+ind1+",'cartes/imagedos.jpg');tournecarte("+ind2+",'cartes/imagedos.jpg');",temp);
						}
						testaff=0;//le nombre de cartes retournées passe à 0
					}
					nbcoup++;//le nombre de coups augmente
				}
			}
		</script>