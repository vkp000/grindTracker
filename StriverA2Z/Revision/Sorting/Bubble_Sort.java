// https://www.geeksforgeeks.org/problems/bubble-sort/1
// https://www.linkedin.com/in/vkp00


class Solution {
    public void bubbleSort(int[] arr) {
        // code here
        for(int i=0; i<arr.length-1; i++) {
            for(int  j= 0; j< arr.length-1-i; j++) {

                if(arr[j] > arr[j+1]) {
                    int temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
        }
    }
}