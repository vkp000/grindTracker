// https://www.geeksforgeeks.org/problems/insertion-sort/1
// https://www.linkedin.com/in/vkp00/

class Solution {
    // Please change the array in-place
    public void insertionSort(int arr[]) {
        // code here
        for(int i =1; i<arr.length; i++) {
            int val = arr[i];
            int j = i;
            while(j >= 1 && val < arr[j-1]) {
                int temp = arr[j];
                arr[j] = arr[j-1];
                arr[j-1] = temp;
                j--;
            }
            arr[j] = val;
        }
    }
}