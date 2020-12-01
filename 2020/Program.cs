using System;
using System.Collections.Generic;
using AdventOfCode_2019.Functions;
using AdventOfCode_2020.Days;
using AdventOfCode_2020.Functions;

namespace aoc_2020
{
    class Program
    {
        static void Main(string[] args)
        {
            // Console.WriteLine("Fuel Needed [12]: {0}", Fuel.CalculateFuel(12));
            // Console.WriteLine("Fuel Needed [14]: {0}", Fuel.CalculateFuel(14));
            // Console.WriteLine("Fuel Needed [1969]: {0}", Fuel.CalculateFuel(1969));
            // Console.WriteLine("Fuel Needed [100756]: {0}", Fuel.CalculateFuel(100756));

            List<int> testArray = new List<int> {1721, 979, 366, 299, 675, 1456};
            Console.WriteLine("Expense Product: {0}", Expense.FindSumSetFuture(testArray));

            Console.WriteLine("Full Expense Calcuation: {0}", Day01.CalculateDayAnswer());
        }
    }
}
