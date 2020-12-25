using System;
using System.Collections;
using System.Collections.Generic;

namespace AdventOfCode_2020.Days {
  public static class Extensions {
    public static T Last<T>(this List<T> source) {
      if (source.Count == 0) throw new IndexOutOfRangeException();

      return source[source.Count - 1];
    }

    public static T[] Subarray<T>(this T[] source, int start, int end) {
      if (end < 0) end = source.Length + end;
      int len = end - start;
      T[] res = new T[len];
      for(int i = 0; i < len; i++) {
        res[i] = source[i + start];
      }
      return res;
    }

    public static Queue<T> CloneCount<T>(this Queue<T> source, int count) {
      Queue<T> output = new Queue<T>();

      var tempClone = source.ToArray();

      for(int i = 0; i < count; i++) {
        output.Enqueue(tempClone[i]);
      }

      return output;
    }

    public static void Set<TKey, TValue>(this Dictionary<TKey, TValue> dictionary, TKey key, TValue value) {
      if (dictionary.ContainsKey(key)) {
        dictionary[key] = value;
      } else {
        dictionary.Add(key, value);
      }
    }

    public static void PrintDictionary<TKey,TValue>(Dictionary<TKey, TValue> dictionary) {
      if (typeof(TValue).IsAssignableFrom(typeof(IEnumerable<object>))) {
        foreach(KeyValuePair<TKey, TValue> pair in dictionary) {
          Console.WriteLine("{0}: {1}", pair.Key, String.Join(",", pair.Value));
        }
      } else {
        foreach(KeyValuePair<TKey, TValue> pair in dictionary) {
          Console.WriteLine("{0}: {1}", pair.Key, pair.Value);
        }
      }
    }

    public static void PrintDictionaryEnumerableValue<TKey,TValue>(Dictionary<TKey, HashSet<TValue>> dictionary) {
      foreach(KeyValuePair<TKey, HashSet<TValue>> pair in dictionary) {
          Console.WriteLine("{0}: {1}", pair.Key, String.Join(",", pair.Value));
        }
    }
  }
}