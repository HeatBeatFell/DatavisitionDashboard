; Next.js全屏展示一体化脚本 (优化版)
#NoTrayIcon
#SingleInstance Force
SetTitleMatchMode, 2

; 初始化配置 - 保持您原有的变量和值
pm2Path := "C:\Users\" . A_UserName . "\AppData\Roaming\npm\pm2.cmd"
nextjsDir := "C:\app"
chromePath := "C:\Program Files\Google\Chrome\Application\chrome.exe"
url := "http://localhost:3000"

; 步骤1：启动PM2服务 - 完全保持原有写法
Run, %ComSpec% /c "cd /d %nextjsDir% && %pm2Path% start ecosystem.config.js",, Hide

; 等待PM2服务启动 - 保持原有时间
Sleep, 5000

; 步骤2：检测显示器配置 - 完全保持原有写法
SysGet, MonitorCount, MonitorCount
maxArea := 0
tvIndex := 0
Loop, %MonitorCount% {
SysGet, Monitor, Monitor, %A_Index%
area := (MonitorRight - MonitorLeft) * (MonitorBottom - MonitorTop)
if (area > maxArea) {
maxArea := area
tvIndex := A_Index
}
}

if (tvIndex = 0) {
SysGet, TV, Monitor, 1
} else {
SysGet, TV, Monitor, %tvIndex%
}

TVWidth := TVRight - TVLeft
TVHeight := TVBottom - TVTop

; 步骤3：在电视机上启动Chrome全屏模式 - 保持原有逻辑
Run, taskkill /f /im chrome.exe,, Hide
Sleep, 1000

; 构造参数字符串 - 保持原有写法
args := "--kiosk --window-position=" . TVLeft . "," . TVTop . " --window-size=" . TVWidth . "," . TVHeight . " " . url
fullCmd := """" . chromePath . """ " . args

; 启动Chrome并隐藏任务栏图标
Run, %ComSpec% /c %fullCmd%,, Hide
Sleep, 3000

; === 新增：隐藏任务栏图标功能 ===
; 等待Chrome窗口出现
WinWait, ahk_exe chrome.exe,, 5
if ErrorLevel = 0
{
; 获取Chrome窗口句柄
WinGet, hWnd, ID, ahk_exe chrome.exe

; 添加工具窗口样式 (0x80) - 不在任务栏显示
WinSet, ExStyle, +0x80, ahk_id %hWnd%

; 移除APPWINDOW样式 (0x40000) - 避免出现在任务栏
WinSet, ExStyle, -0x40000, ahk_id %hWnd%
}

; 步骤4：添加监控功能 - 完全保持原有写法
SetTimer, ServiceMonitor, 60000
return

ServiceMonitor:
; 检查Chrome是否运行 - 保持原有写法
Process, Exist, chrome.exe
chromeRunning := ErrorLevel

; 检查Node服务是否响应 - 保持原有写法
whr := ComObjCreate("WinHttp.WinHttpRequest.5.1")
try {
whr.Open("GET", "http://localhost:3000", true)
whr.Send()
whr.WaitForResponse(5)
serviceStatus := whr.Status
} catch {
serviceStatus := 0
}

; 如果Chrome未运行或服务不可用，重启 - 保持原有写法
if (!chromeRunning || serviceStatus != 200) {
Run, %ComSpec% /c "cd /d %nextjsDir% && %pm2Path% restart all",, Hide
Sleep, 5000
Run, taskkill /f /im chrome.exe,, Hide
Sleep, 2000

; 重启时也应用隐藏任务栏逻辑
args := "--kiosk --window-position=" . TVLeft . "," . TVTop . " --window-size=" . TVWidth . "," . TVHeight . " " . url
fullCmd := """" . chromePath . """ " . args
Run, %ComSpec% /c %fullCmd%,, Hide
Sleep, 3000

; 对新窗口应用隐藏任务栏
WinWait, ahk_exe chrome.exe,, 5
if ErrorLevel = 0
{
WinGet, hWnd, ID, ahk_exe chrome.exe
WinSet, ExStyle, +0x80, ahk_id %hWnd%
WinSet, ExStyle, -0x40000, ahk_id %hWnd%
}
}
return

; 安全退出热键 - 保持原有写法
^!+q::
Run, %ComSpec% /c "cd /d %nextjsDir% && %pm2Path% stop all",, Hide
Process, Close, chrome.exe
ExitApp
return