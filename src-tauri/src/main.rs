// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


use urlencoding::encode;
use webbrowser;



#[tauri::command]
fn search(query: String, parameters: &str) -> u8{


  // define the search parameters from the input var
  let mut options: [&str; 4] = ["github.com", "stackoverflow.com", "w3schools.com", "google.com"];
  for (index, char) in parameters.chars().enumerate(){
    if 'F' == char{
      options[index] = "";
    }
  }


  // query optimizations
  let mut final_query: String = ["https://www.google.com/search?q=", &encode(query.as_str())].join("");
  let mut site_adder: String;
  let mut check: bool = false;

  for site in 0..3{
    if options[site] != ""{
      if check{
        site_adder = "+OR+site%3A".to_string();
      } else {
        site_adder = "+site%3A".to_string();
        check = true;
      }
      final_query = [final_query, site_adder, options[site].to_string()].join("");
    }
  }

  if webbrowser::open(&final_query).is_ok() {
    return 1
  } else {
    return 0
  }
  // return final_query;
}


// #[tauri::command]
// fn close(){
//   println!("blehh");
// }

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![search])
    // .invoke_handler(tauri::generate_handler![close])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
