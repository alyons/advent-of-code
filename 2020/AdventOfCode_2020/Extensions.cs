using System;
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
    }
}