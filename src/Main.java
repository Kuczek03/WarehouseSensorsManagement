import java.util.Scanner;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;

public class Main {
    public static void main(String[] args) {
        Scanner inputScanner = new Scanner(System.in);
        int liczbaLodowek = 0;
        int[] liczbaPolekWLodowce;
        File plik = new File("dane.txt");

        if (!plik.exists()) {
            try {
                PrintWriter writer = new PrintWriter(plik);
                writer.println("2");
                writer.println("3 2");
                writer.close();
            } catch (FileNotFoundException e) {
                System.err.println("Nie można utworzyć pliku.");
                return;
            }
        }

        try {
            Scanner scanner = new Scanner(plik);
            liczbaLodowek = scanner.nextInt();
            liczbaPolekWLodowce = new int[liczbaLodowek];
            for (int i = 0; i < liczbaLodowek; i++) {
                liczbaPolekWLodowce[i] = scanner.nextInt();
            }
            scanner.close();
        } catch (FileNotFoundException e) {
            System.err.println("Nie znaleziono pliku.");
            return;
        }

        double[][] temperatury = new double[liczbaLodowek][];
        for (int i = 0; i < liczbaLodowek; i++) {
            temperatury[i] = new double[liczbaPolekWLodowce[i]];
            for (int j = 0; j < liczbaPolekWLodowce[i]; j++) {
                temperatury[i][j] = Math.round(Math.random() * 50) * 0.1; // Zaokrąglenie do jednego miejsca po przecinku
            }
        }

        // Wyświetlenie informacji o lodówkach i temperaturach
        System.out.println("Aktualne dane lodówek:");
        wyswietlDane(liczbaLodowek, liczbaPolekWLodowce, temperatury);

        // Zapytaj użytkownika o zmiany w danych lodówek
        System.out.println("Czy chcesz dokonać zmian w danych lodówek? (tak/nie)");
        String odpowiedz = inputScanner.nextLine();
        if (odpowiedz.equalsIgnoreCase("tak")) {
            System.out.print("Podaj nową liczbę lodówek: ");
            liczbaLodowek = inputScanner.nextInt();
            liczbaPolekWLodowce = new int[liczbaLodowek];
            for (int i = 0; i < liczbaLodowek; i++) {
                System.out.print("Podaj liczbę półek w lodówce " + (i + 1) + ": ");
                liczbaPolekWLodowce[i] = inputScanner.nextInt();
            }

            // Aktualizacja danych w pliku
            try {
                PrintWriter writer = new PrintWriter(plik);
                writer.println(liczbaLodowek);
                for (int i = 0; i < liczbaLodowek; i++) {
                    writer.print(liczbaPolekWLodowce[i] + " ");
                }
                writer.close();
            } catch (FileNotFoundException e) {
                System.err.println("Nie można zaktualizować pliku.");
                return;
            }

            // Zaktualizowanie tablicy z temperaturami
            temperatury = new double[liczbaLodowek][];
            for (int i = 0; i < liczbaLodowek; i++) {
                temperatury[i] = new double[liczbaPolekWLodowce[i]];
                for (int j = 0; j < liczbaPolekWLodowce[i]; j++) {
                    temperatury[i][j] = Math.round(Math.random() * 50) * 0.1; // Zaokrąglenie do jednego miejsca po przecinku
                }
            }

            // Wyświetlenie zaktualizowanych danych lodówek
            System.out.println("\nZaktualizowane dane lodówek:");
            wyswietlDane(liczbaLodowek, liczbaPolekWLodowce, temperatury);
        }
    }

    // Metoda do wyświetlania danych lodówek
    private static void wyswietlDane(int liczbaLodowek, int[] liczbaPolekWLodowce, double[][] temperatury) {
        for (int i = 0; i < liczbaLodowek; i++) {
            System.out.println("Lodówka " + (i + 1) + ":");
            for (int j = 0; j < liczbaPolekWLodowce[i]; j++) {
                double zaokraglonaTemperatura = Math.round(temperatury[i][j] * 10.0) / 10.0;
                System.out.println("Półka " + (j + 1) + ": " + zaokraglonaTemperatura + " °C");
            }
            System.out.println();
        }
    }
}