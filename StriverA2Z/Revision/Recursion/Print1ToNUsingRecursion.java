// https://linkedin.com/in/vkp00


import java.util.*;
 
public class Print1ToNUsingRecursion{
    
    static void printThis(int n) {
        if(n == 0) {
            return;
        }
        
        printThis(n-1);
        
        System.out.println(n);
    }
    public static void main(String [] args) {
        Scanner sc = new Scanner(System.in);
        
        int n = sc.nextInt();
        
        printThis(n);
    }
}