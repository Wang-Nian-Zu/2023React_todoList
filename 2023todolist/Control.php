<?php
require('Model.php');

if(isset($_REQUEST['act'])){
    $act = $_REQUEST['act'];
}else{
    $act = '';
}

switch ($act) {
    case "addEvent": //新增一項代辦事項
        $json = json_decode(file_get_contents("php://input")); //json_decode第二個參數加上true會變成返回陣列，否者返回物件
        $title = $json->title;
        $content = $json->content;
        $dueDate = $json->dueDate;
        $response = array();
        if((isset($title))&(isset($content))&(isset($dueDate))&($title !== "")&($content !== "")&($dueDate !== "")){
            $response["status"] = 'valid';
            addEvent($title, $content, $dueDate);
            $response["cause"] = "新增成功!!";
        }else{
            $response["status"] = 'invalid';
            $response["cause"] = "錯誤: 有資料遺失!!";
        }
        echo json_encode($response);
        break;
    case "getToDoList": //撈出資料庫所有的待辦事項
        $response = array();
        $response["list"] = getToDoList();
        echo json_encode($response);
        break;
    case "deleteEvent": //刪除指定的待辦事項
        $id = $_GET["id"];
        $response = array();
        if(deleteEvent($id)){
            $response["status"] = "valid";
            $response["cause"] = "刪除成功";
        }else{
            $response["status"] = "invalid";
        }
        echo json_encode($response);
        break;
    case "editEvent": //編輯指定的待辦事項
        $json = json_decode(file_get_contents("php://input")); //json_decode第二個參數加上true會變成返回陣列，否者返回物件
        $id = $json->id;
        $title = $json->title;
        $content = $json->content;
        $dueDate = $json->dueDate;
        $status = $json->status;
        $response = array();
        if((isset($id))&(isset($title))&(isset($content))&(isset($dueDate))&(isset($status))&($id !== "")&($title !== "")&($content !== "")&($dueDate !== "")&($status !== "")){
            $response["status"] = 'valid';
            editEvent($id, $title, $content, $dueDate, $status);
            $response["cause"] = "編輯成功!!";
        }else{
            $response["status"] = 'invalid';
            $response["cause"] = "錯誤: 有資料遺失!!";
        }
        echo json_encode($response);
        break;
    default:
}
?>