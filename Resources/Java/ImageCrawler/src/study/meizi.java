package study;

import java.util.*;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;

public class meizi {
    /**
     * Download the picture to the specified directory
     *
     * @param filePath File path
     * @param imgUrl   Picture URL
     */
	
    public static void downImages(String filePath, String imgUrl) {
        // If the specified folder does not exist, create it first
        File dir = new File(filePath);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        
     // Intercept image file name
        String fileName = imgUrl.substring(imgUrl.lastIndexOf('/') + 1, imgUrl.length());

        try {
            // There may be Chinese or blank in the file name, so we need to deal with it here. But spaces are converted to plus by URLEncoder
            String urlTail = URLEncoder.encode(fileName, "UTF-8");
            // Therefore, the plus sign should be converted to% 20 in UTF-8 format.
            imgUrl = imgUrl.substring(0, imgUrl.lastIndexOf('/') + 1) + urlTail.replaceAll("\\+", "\\%20");

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
       
        
        // Written paths
        File file = new File(filePath + File.separator + fileName);

        try {
            // Get the picture URL
            URL url = new URL(imgUrl);
            // Get connected
            URLConnection connection = url.openConnection();
            // Set the corresponding time of 10 seconds
            connection.setConnectTimeout(10 * 1000);
            //connection.setReadTimeout(20*1000);
            // Get the input stream
            InputStream in = connection.getInputStream();
            // Obtain the output stream
            BufferedOutputStream out = new BufferedOutputStream(new FileOutputStream(file));
            // Building Buffers
            byte[] buf = new byte[1024];
            int size;
            // Write to a file
            while (-1 != (size = in.read(buf))) {
                out.write(buf, 0, size);
            }
            out.close();
            in.close();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
    
    public static void findhref(String hrefURL) {
    	// Getting Connections Using Jsoup
        Connection connect = Jsoup.connect(hrefURL);
        try {
            // Get the Document object
            Document document = connect.get();
            // Find all img Tags
            Elements imgs = document.getElementsByTag("img");
            System.out.println("A total of the following were detected imgURL: ");
            // Traverse the img tag and get the attributes of src
            for (Element element : imgs) {
                //Get each a tag URL "abs:" for the absolute path
                String imgUrl = element.attr("abs:src");
                // Print URL
                if(imgUrl.charAt(4)=='s') {
                	if(imgUrl.charAt(6)=='/' && imgUrl.charAt(7)!='/') {
                		imgUrl = imgUrl.substring(0,6) + '/' + imgUrl.substring(6,imgUrl.length());
                	}
                }
                System.out.println(imgUrl);
                //Download pictures to local
                meizi.downImages("e:/img", imgUrl);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    

    public static void main(String[] args) {
        // Getting Connections Using Jsoup
        Connection connect = Jsoup.connect("https://www.metpage.org");
        try {
            // Get the Document object
            Document document = connect.get();
            // Find all a Tags
            Elements hrefs = document.getElementsByTag("a");
            System.out.println("Start downloading");
            // Traverse the a tag and get the attributes of href
            for (Element element : hrefs) {
                //Get each a tag URL "abs:" for the absolute path
                String hrefURL = element.attr("abs:href");
                //Download pictures to local
                if(hrefURL.equals("")) {
                	//System.out.println("1111111111111111:");
                	continue;
                }
                
                meizi.findhref(hrefURL);
            }
            System.out.println("Download complete");
        } catch (IOException e) {
            e.printStackTrace();
        }
       
        // Here we delete all files that doesn't have image extension
        File folder = new File("e:/img");
        File fList[] = folder.listFiles();

        for (File f : fList) {
            //if (!f.getName().endsWith(".png")) {
           if (!f.getName().endsWith(".png")&&!f.getName().endsWith(".gif")&&!f.getName().endsWith(".jpg")&&!f.getName().endsWith(".jpeg")) {    
                f.delete(); 
            }}
        System.out.println("Delete done");
           
    }
      
}