class Solution {

    void rec(int[] arr, int j, int i) {
        if (j >= arr.length - 1 - i)
            return;

        if (arr[j] > arr[j + 1]) {
            int temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
        }

        rec(arr, j + 1, i);
    }

    void kaju(int[] arr, int i) {
        if (i >= arr.length - 1)
            return;

        rec(arr, 0, i);
        kaju(arr, i + 1);
    }

    public void bubbleSort(int[] arr) {

        kaju(arr, 0);
    }

    // without recurion 

    // for(int i =0; i<arr.length-1; i++) {
 
            // for(int j = 0; j <arr.length-i-1; j++){
                
            //     if(arr[j] > arr[j+1]){
            //         int temp = arr[j];
            //         arr[j] = arr[j+1];
            //         arr[j+1] = temp;
            //     }
 
            // }
        
        // }
}