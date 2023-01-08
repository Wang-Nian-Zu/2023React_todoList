<?php
require_once("dbConfig.php");
function addEvent($title, $content, $dueDate){ //新增一項代辦事項
    global $db;
    $status = "undone";
    $sql = "INSERT INTO `event` (`title`, `content`, `dueDate`, `status`) VALUES (?, ?, ?, ?)"; //sql指令的insert語法
    $stmt = mysqli_prepare($db, $sql); //prepare sql statement
    mysqli_stmt_bind_param($stmt, "ssss", $title, $content, $dueDate, $status); //bind parameters with variables(將變數bind到sql指令的問號中)
    mysqli_stmt_execute($stmt);  //執行SQL
    return ;
}
function getToDoList(){ //撈出資料庫所有的待辦事項
    global $db;
    $sql = "SELECT * from `event`;"; 
    $stmt = mysqli_prepare($db, $sql);//$db是另一個程式生成的資料庫連線物件,  prepare:表示用這個資料庫($db)把sql指令compile好
    mysqli_stmt_execute($stmt);//執行一個sql指令
    $result = mysqli_stmt_get_result($stmt);
    $retArr=array(); //用一個array存下面的每一筆資料(一筆資料也是一個array)
    while($rs = mysqli_fetch_assoc($result)){
        $tArr=array(); //一維陣列存下面個欄位變數
        $tArr['id']=$rs['id'];
        $tArr['title']=$rs['title'];
        $tArr['content']=$rs['content'];
        $tArr['dueDate']=$rs['dueDate'];
        $tArr['status']=$rs['status'];
        $retArr[] = $tArr;
    }
    return $retArr;//最後是回傳一個二維陣列
}
function deleteEvent($id){ //刪除指定的待辦事項
    global $db;
    $sql = "DELETE FROM `event` where `event`.`id` = ?";  
    $stmt = mysqli_prepare($db, $sql);
    mysqli_stmt_bind_param($stmt,"i",$id); 
    mysqli_stmt_execute($stmt);
    return true;
}
function editEvent($id, $title, $content, $dueDate, $status){ //編輯指定的待辦事項
    global $db;
    $sql = "UPDATE `event` SET `title`= ?,`content`= ?,`dueDate`= ? ,`status` = ? WHERE `id` = ? ;";  
    $stmt = mysqli_prepare($db, $sql);
    mysqli_stmt_bind_param($stmt,"ssssi", $title, $content, $dueDate, $status, $id); 
    mysqli_stmt_execute($stmt);
    return ;
}

?>