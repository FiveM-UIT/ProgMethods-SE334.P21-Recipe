% Define recipes with their required ingredients
recipe('Salad Rau Tron', ['rau', 'dua leo', 'ca chua']).
recipe('Trung Chien', ['trung', 'hanh']).
recipe('Ga Ran', ['thit ga', 'bot']).
recipe('Pho Bo', ['thit bo', 'banh pho', 'rau thom', 'hanh', 'que']).
recipe('Bun Cha', ['thit heo', 'bun', 'rau song', 'nuoc mam', 'toi', 'ot']).
recipe('Com Chien Hai San', ['com', 'tom', 'muc', 'trung', 'hanh']).
recipe('Mi Xao Hai San', ['mi', 'tom', 'muc', 'rau cai', 'hanh', 'toi']).
recipe('Lau Thai', ['tom', 'muc', 'thit bo', 'nam', 'rau thom', 'sa', 'la chanh']).
recipe('Lau Hai San', ['tom', 'muc', 'ca', 'nam', 'rau cai', 'sa']).
recipe('Banh Mi Xiu Mai', ['thit heo', 'banh mi', 'ca chua', 'hanh', 'toi']).
recipe('Ga Nuong Mat Ong', ['thit ga', 'mat ong', 'toi', 'nuoc mam']).
recipe('Com Ga Hoi An', ['thit ga', 'com', 'rau thom', 'hanh', 'gung']).

% Define ingredient replacements
replacement('thit ga', 'thit bo').
replacement('thit heo', 'thit bo').
replacement('nuoc mam', 'tuong').
replacement('thit bo', 'thit ga').
replacement('thit bo', 'thit heo').
replacement('tuong', 'nuoc mam').

% Check if an ingredient or its replacement is available
ingredient_available(Ingredient, Ingredients) :-
    member(Ingredient, Ingredients).
ingredient_available(Ingredient, Ingredients) :-
    replacement(Ingredient, Alternative),
    member(Alternative, Ingredients).

% Check if all required ingredients (or their replacements) are available
all_ingredients_available([], _).
all_ingredients_available([H|T], Ingredients) :-
    ingredient_available(H, Ingredients),
    all_ingredients_available(T, Ingredients).

% Suggest recipes based on available ingredients
suggest_recipe(Ingredients, Recipe) :-
    recipe(Recipe, Required),
    all_ingredients_available(Required, Ingredients).