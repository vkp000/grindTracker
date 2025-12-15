package StriverA2Z.Practice;

import java.util.ArrayList;

public class p {

    void MergeSort(int[] arr, int l, int r) {
        if (l >= r)
            return;

        int mid = l + (r - l) / 2;

        MergeSort(arr, l, mid);
        MergeSort(arr, mid + 1, r);

        Merge(arr, mid, l, r);
    }

    void Merge(int[] arr, int mid, int l, int r) {

        ArrayList<Integer> a1 = new ArrayList<>();
        ArrayList<Integer> a2 = new ArrayList<>();

        for (int i = l; i <= mid; i++) {
            a1.add(arr[i]);
        }

        for (int i = mid + 1; i <= r; i++) {
            a2.add(arr[i]);
        }

        int i = 0, j = 0, k = l;

        while (i < a1.size() && j < a2.size()) {

            if (a1.get(i) < a2.get(j)) {
                arr[k++] = a1.get(i++);

            } else if (a1.get(i) > a2.get(j)) {
                arr[k++] = a2.get(j++);

            } else {
                arr[k++] = a1.get(i++);
                arr[k++] = a2.get(j++);
            }
        }

        while (i < a1.size())
            arr[k++] = a1.get(i++);

        while (j < a2.size())
            arr[k++] = a2.get(j++);
    }

   
}
