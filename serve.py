#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
nobook_chem_offline - 纯静态 SPA 服务器（noserver 分支本地运行用）

与已移除的 server.py 不同：本文件不含任何 API 代理 / 录制 / mock 逻辑，
仅托管静态资源，并对客户端路由（无扩展名的路径）回退到 404.html（= index.html），
使 /chemical/new?moduleId=9 这类深链能正常加载 SPA。

运行：  python serve.py            （默认 http://127.0.0.1:8010）
可选：  python serve.py 9000       （自定义端口）
"""
import os
import sys
import http.server
import socketserver
from urllib.parse import urlparse

ROOT = os.path.dirname(os.path.abspath(__file__))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8010
FALLBACK = "/404.html"  # 已在 noserver 分支创建，内容等同 index.html


class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def send_head(self):
        # 去掉 query，得到真实路径
        clean_path = urlparse(self.path).path
        fs_path = self.translate_path(clean_path)

        # 1) 真实存在的静态文件 -> 正常返回
        if os.path.isfile(fs_path):
            return super().send_head()

        # 2) 无扩展名的路径视为 SPA 路由 -> 回退到 404.html（= index.html）
        base = os.path.basename(clean_path.rstrip("/"))
        if "." not in base:
            self.path = FALLBACK
            return super().send_head()

        # 3) 缺失的静态资源（带扩展名）-> 交给父类返回 404
        return super().send_head()

    def log_message(self, fmt, *args):
        # 安静一点
        pass


class ThreadingServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True


if __name__ == "__main__":
    os.chdir(ROOT)
    with ThreadingServer(("127.0.0.1", PORT), SPAHandler) as httpd:
        print(f"nobook_chem_offline static server running at http://127.0.0.1:{PORT}/")
        print(f"SPA fallback -> {FALLBACK}  (open http://127.0.0.1:{PORT}/chemical/new?moduleId=9 )")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nserver stopped.")
