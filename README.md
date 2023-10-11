# Sudoku
Stworzenie prostej gry Sudoku na potrzeby zaliczenia z przedmiotu Projekt Zespołowy - Politechnika Częstochowska

1.Stworzenie macierzy 9x9
2.Wypenienie jej losowym liczbami w wierszu bez powtórzen i w kolumnie bezpowtorzen az do całkowitego zapelnienia planszy. W macierzach 3x3 liczby również nie mogą się powtarzać.
Przykładowy sposób implementacji algorytmu:
    ⦁	algorytm losuje na każdym polu planszy wartość od jeden do dziewięć. W momencie gdy wszystkie pola planszy zostały wylosowane algorytm sprawdzający 
        a.	przechodzi po wsyztkich wierszach w macierzy 9x9
        b.	przechodzi po wsyztkich kolumnach w macierzy 9x9
        c.	przechodzi po wszystkich elementach kwadratów 3x3
    i sprawdza czy elementy się nie powtarzają. Jeżali się powtarzają losuje na nowo, jeżeli nie proces jest zakończony.
3.  Przypisanie 81 pól macierzy do pól planszy Sudoku
4.Wyświetlenie użytkownikowi 25 z 81 pól na planszy SUDOKU
5. Użytkownik ma możliwość zaznaczenia określonego elementu na planszy oraz kafelka pod planszą wówczas:
    ⦁	algorytm sprawdza czy kafelek, który zaznaczył użytkownik może być na wybranym miejscu
        ⦁	sprawdzenie będzie odbywało się przez porównanie czy kafalek wybrany przez użytkownika na odpowiednim polu planszy jest zgodny z wylosowanym kafelkiem przez algorytm losujący.
        ⦁	w sytuacji gdy kafelek nie pasuje na planszy pole , które zaznaczył użytkownik podświetla się na czerwono przez 5 sekund. Odjęty zostaję użytkownikowi punkt życia. 
        ⦁	 w sytuacji gdy kafelek pasuje na polu planszy to pole zostaje odkryte

6. Jeżeli macierz 3x3 zostanie poprawnie rozwiazana podświetli się ona na zielono
7.Jeżeli wszystkie macierze 3x3 zostaną prawidłowo rozwiązane to cała macierz 9x9 zostanie podświetlona na zielono i wyświetli się napis "Udało Ci się rozwiązać sudoku".