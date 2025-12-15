//  https://www.geeksforgeeks.org/problems/selection-sort/1?utm_source=youtube&utm_medium=collab_striver_ytdescription&utm_campaign=selection-sort

// https://www.linkedin.com/in/vkp00

class Solution {
    void selectionSort(int[] arr) {
        // code here
        for (int i = 0; i < arr.length - 1; i++) {
            int key = i;
            for (int j = i + 1; j < arr.length; j++) {

                if (arr[j] < arr[key]) {   // <---------- the main thing to focus
                    key = j;
                }

            }

            // swap happens for each outer loop 
            int temp = arr[key];
            arr[key] = arr[i];
            arr[i] = temp;

        }
    }
}