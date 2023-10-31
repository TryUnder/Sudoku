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

Dokumentacja techniczna algorytmu TileGenerator.js

Generowanie planszy Sudoku
Funkcja generateSudoku(): Ta funkcja jest głównym punktem wejścia do generowania planszy Sudoku. Tworzy planszę o rozmiarze 9x9, wypełniając ją wartościami null.

Funkcja isValid(num, row, col): Ta funkcja sprawdza, czy dana liczba num jest dopuszczalna w danym polu planszy. Sprawdza, czy liczba nie występuje w tym samym wierszu, kolumnie i kwadracie 3x3. Wykorzystuje funkcje includes oraz some do sprawdzenia tych warunków.

Funkcja fillGrid(row, col): Jest to funkcja rekurencyjna, która próbuje wypełnić planszę Sudoku. Rozpoczyna od pozycji (row, col) i przechodzi przez planszę w sposób rekurencyjny. Dla każdej pustej komórki, losuje i próbuje wstawić liczby od 1 do 9, sprawdzając przy tym warunki poprawności za pomocą isValid. Jeśli uda się wypełnić planszę, funkcja zwraca true.

Wewnątrz funkcji fillGrid, liczby do wypróbowania są losowo tasowane, aby uzyskać różne układy planszy za każdym razem. Funkcja sort(() => Math.random() - 0.5) służy do tasowania.

Generowana plansza jest przechowywana w tablicy grid, która jest zwracana na końcu.

Uruchamianie kodu
Po wywołaniu funkcji generateSudoku(), plansza Sudoku jest zapisywana w zmiennej sudokuGrid.

Plansza jest wyświetlana w konsoli za pomocą pętli forEach i funkcji console.log.

Opisowa dokumentacja algorytmu TileGenerator.js

Ten kod generuje planszę Sudoku przy użyciu podejścia rekurencyjnego. Plansza jest wypełniana liczbami od 1 do 9, spełniającymi warunki gry Sudoku. Algorytm losowo wybiera liczby do wypełnienia planszy, co pozwala na uzyskanie różnych układów planszy za każdym razem, gdy kod jest uruchamiany.

W kodzie wykorzystywane są funkcje JavaScript takie jak includes, some, sort oraz rekurencyjne wywołania funkcji w celu wypełnienia planszy. Algorytm jest zaprojektowany w sposób umożliwiający generowanie planszy bez zer.

lost() - funkcja przekierowuje do okna informujacego  o przegranej grze oraz daje mozliwosc rozpoczecia nowej gry