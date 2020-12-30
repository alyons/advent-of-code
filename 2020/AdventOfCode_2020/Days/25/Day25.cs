using System;
using System.IO;
using System.Collections.Generic;

namespace AdventOfCode_2020.Days {
  public static class Day25 {
    public static void ReverseCryptographicHandshake() {
      long subjectNumber = 1;
      long cardPublicKey = 6552760; // 13233401; // 5764801;
      long doorPublicKey = 13233401; // 6552760; // 17807724;
      long cardLoopNumber = 0;
      long doorLoopNumber = 0;
      long cardValue = 1;
      long doorValue = 1;
      long cardEncryptionValue = 1;
      long doorEncryptionValue = 1;

      bool shouldBreak = false;

      do {
        // Iterate Subject Number
        subjectNumber++;

        // Find Subject Number
        cardValue = 1;
        cardLoopNumber = 0;
        Console.WriteLine("Testing Subject Number: {0}", subjectNumber); 
        // Console.WriteLine("Iteration (0): {0}", cardValue);
        while(cardValue < cardPublicKey) {
          cardValue = SingleIteration(subjectNumber, cardValue);
          cardLoopNumber++;
          // Console.WriteLine("Iteration ({0}): {1}", cardLoopNumber, cardValue);
        }

        doorValue = 1;
        doorLoopNumber = 0;
        if (cardValue == cardPublicKey) {
          // Console.WriteLine("Iteration (0): {0}", doorValue);
          while(doorValue != doorPublicKey) {
            doorValue = SingleIteration(subjectNumber, doorValue);
            doorLoopNumber++;
            // Console.WriteLine("Iteration ({0}): {1}", doorLoopNumber, doorValue);
          }
        }

        cardEncryptionValue = 1;
        doorEncryptionValue = 1;

        if (cardValue == cardPublicKey && doorValue == doorPublicKey) {
          // Logic to validate number
          for(int i = 0; i < cardLoopNumber; i++) { doorEncryptionValue = SingleIteration(doorPublicKey, doorEncryptionValue); }
          for(int i = 0; i < doorLoopNumber; i++) { cardEncryptionValue = SingleIteration(cardPublicKey, cardEncryptionValue); }
        }

        shouldBreak = cardValue == cardPublicKey &&
                      doorValue == doorPublicKey &&
                      cardEncryptionValue > 1 &&
                      cardEncryptionValue == doorEncryptionValue;

        shouldBreak |= subjectNumber >= 20201227;

      } while(!shouldBreak);

      Console.WriteLine("Card Subject Number {0} after {1} iterations.", subjectNumber, cardLoopNumber);
      Console.WriteLine("Door Subject Number {0} after {1} iterations.", subjectNumber, doorLoopNumber);
      Console.WriteLine("Encryption Key: {0}", cardEncryptionValue);

      // 19325929 (too high)
    }

    static long SingleIteration(long subjectNumber, long value) {
      value *= subjectNumber;
      return value % 20201227;
    }
  }
}