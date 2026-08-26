import * as ProductService from '../services/producto_service.js'

export async function getProducts(req, res, next) {
  try { const2026-08-26 12:19:36.011 [info] [main] Log level: Info
2026-08-26 12:19:36.011 [info] [main] Validating found git in: "C:\Program Files\Git\cmd\git.exe"
2026-08-26 12:19:36.011 [info] [main] Validating found git in: "C:\Program Files (x86)\Git\cmd\git.exe"
2026-08-26 12:19:36.011 [info] [main] Validating found git in: "C:\Program Files\Git\cmd\git.exe"
2026-08-26 12:19:36.011 [info] [main] Validating found git in: "C:\Users\wanda\AppData\Local\Programs\Git\cmd\git.exe"
2026-08-26 12:19:36.011 [info] [main] Validating found git in: "D:\Programacion\Git\cmd\git.exe"
2026-08-26 12:19:36.946 [info] [main] Using git "2.55.0.windows.5" from "D:\Programacion\Git\cmd\git.exe"
2026-08-26 12:19:36.946 [info] [Model][doInitialScan] Initial repository scan started
2026-08-26 12:19:37.019 [info] > git rev-parse --show-toplevel [50ms]
2026-08-26 12:19:37.019 [info] fatal: not a git repository (or any of the parent directories): .git
2026-08-26 12:19:37.076 [info] > git rev-parse --show-toplevel [53ms]
2026-08-26 12:19:37.076 [info] fatal: not a git repository (or any of the parent directories): .git
2026-08-26 12:19:37.131 [info] > git rev-parse --show-toplevel [50ms]
2026-08-26 12:19:37.131 [info] fatal: not a git repository (or any of the parent directories): .git
2026-08-26 12:19:37.134 [info] [Model][doInitialScan] Initial repository scan completed - repositories (0), closed repositories (0), parent repositories (0), unsafe repositories (0)
2026-08-26 12:38:22.947 [info] > git rev-parse --show-toplevel [42ms]
2026-08-26 12:38:22.947 [info] fatal: not a git repository (or any of the parent directories): .git
2026-08-26 12:49:06.374 [info] > git rev-parse --show-toplevel [545ms]
2026-08-26 12:49:06.374 [info] fatal: not a git repository (or any of the parent directories): .git
2026-08-26 12:49:06.412 [info] > git rev-parse --show-toplevel [34ms]
2026-08-26 12:49:06.412 [info] fatal: not a git repository (or any of the parent directories): .git
2026-08-26 12:55:00.862 [info] > git rev-parse --show-toplevel [40ms]
2026-08-26 12:55:01.376 [info] > git rev-parse --git-dir --git-common-dir --show-superproject-working-tree [505ms]
2026-08-26 12:55:01.390 [info] [Model][openRepository] Opened repository (path): c:\Users\wanda\OneDrive\Desktop\PrototimoHenaos
2026-08-26 12:55:01.390 [info] [Model][openRepository] Opened repository (real path): c:\Users\wanda\OneDrive\Desktop\PrototimoHenaos
2026-08-26 12:55:01.390 [info] [Model][openRepository] Opened repository (kind): repository
2026-08-26 12:55:01.410 [info] [Git][getRemotes] No remotes found in the git config file
2026-08-26 12:55:01.445 [info] > git config --get commit.template [46ms]
2026-08-26 12:55:01.455 [info] > git for-each-ref --format=%(refname)%00%(upstream:short)%00%(objectname)%00%(upstream:track)%00%(upstream:remotename)%00%(upstream:remoteref) --ignore-case refs/heads/master refs/remotes/master [46ms]
2026-08-26 12:55:01.456 [warning] [Git][getBranch] No such branch: master
2026-08-26 12:55:01.469 [info] > git fetch [80ms]
2026-08-26 12:55:01.470 [info] > git for-each-ref --sort -committerdate --format %(refname)%00%(objectname)%00%(*objectname) [1ms] (cancelled)
2026-08-26 12:55:01.482 [info] > git status -z -uall [19ms] (cancelled)
2026-08-26 12:55:01.486 [info] [Git][getRemotes] No remotes found in the git config file
2026-08-26 12:55:01.489 [info] [Git][getRemotes] No remotes found in the git config file
2026-08-26 12:55:01.526 [info] > git for-each-ref --format=%(refname)%00%(upstream:short)%00%(objectname)%00%(upstream:track)%00%(upstream:remotename)%00%(upstream:remoteref) --ignore-case refs/heads/master refs/remotes/master [52ms]
2026-08-26 12:55:01.526 [warning] [Git][getBranch] No such branch: master
2026-08-26 12:55:01.527 [error] [GitHistoryProvider][resolveHEADMergeBase] Failed to resolve merge base for master: Error: No such branch: master.
2026-08-26 12:55:01.530 [info] > git config --get commit.template [51ms]
2026-08-26 12:55:01.531 [info] > git config --get commit.template [50ms]
2026-08-26 12:55:01.537 [info] > git for-each-ref --format=%(refname)%00%(upstream:short)%00%(objectname)%00%(upstream:track)%00%(upstream:remotename)%00%(upstream:remoteref) --ignore-case refs/heads/master refs/remotes/master [48ms]
2026-08-26 12:55:01.537 [warning] [Git][getBranch] No such branch: master
2026-08-26 12:55:01.542 [info] > git for-each-ref --format=%(refname)%00%(upstream:short)%00%(objectname)%00%(upstream:track)%00%(upstream:remotename)%00%(upstream:remoteref) --ignore-case refs/heads/master refs/remotes/master [50ms]
2026-08-26 12:55:01.543 [warning] [Git][getBranch] No such branch: master
2026-08-26 12:55:01.586 [info] > git for-each-ref --sort -committerdate --format %(refname)%00%(objectname)%00%(*objectname) [38ms]
2026-08-26 12:55:01.750 [info] > git show --textconv :back/database/add_missing_tables.sql [44ms]
2026-08-26 12:55:01.759 [info] > git ls-files --stage -- back/database/add_missing_tables.sql [44ms]
2026-08-26 12:55:01.803 [info] > git hash-object -t tree /dev/null [46ms]
2026-08-26 12:55:01.803 [warning] [GitFileSystemProvider][readFile] File not found - git:/c%3A/Users/wanda/OneDrive/Desktop/PrototimoHenaos/back/database/add_missing_tables.sql.git?%7B%22path%22%3A%22c%3A%5C%5CUsers%5C%5Cwanda%5C%5COneDrive%5C%5CDesktop%5C%5CPrototimoHenaos%5C%5Cback%5C%5Cdatabase%5C%5Cadd_missing_tables.sql%22%2C%22ref%22%3A%22%22%7D
2026-08-26 12:55:01.805 [info] > git hash-object -t tree /dev/null [43ms]
2026-08-26 12:55:01.805 [warning] [GitFileSystemProvider][stat] File not found - git:/c%3A/Users/wanda/OneDrive/Desktop/PrototimoHenaos/back/database/add_missing_tables.sql.git?%7B%22path%22%3A%22c%3A%5C%5CUsers%5C%5Cwanda%5C%5COneDrive%5C%5CDesktop%5C%5CPrototimoHenaos%5C%5Cback%5C%5Cdatabase%5C%5Cadd_missing_tables.sql%22%2C%22ref%22%3A%22%22%7D
2026-08-26 12:55:01.973 [info] > git status -z -uall [429ms] (cancelled)
2026-08-26 12:55:02.516 [info] > git check-ignore -v -z --stdin [545ms]
2026-08-26 12:56:14.675 [info] > git log --format=%H%n%aN%n%aE%n%at%n%ct%n%P%n%D%n%B -z --shortstat --diff-merges=first-parent -n50 --skip=0 --topo-order --decorate=full --stdin [46ms]
2026-08-26 12:56:14.675 [info] fatal: bad revision 'refs/heads/master'
2026-08-26 12:56:14.675 [error] [GitHistoryProvider][provideHistoryItems] Failed to get history items with options '{"historyItemRefs":["refs/heads/master"],"limit":50,"skip":0}': Failed to execute git {
  "exitCode": 128,
  "gitCommand": "log",
  "stdout": "",
  "stderr": "fatal: bad revision 'refs/heads/master'\n"
}
2026-08-26 12:56:15.660 [info] > git check-ignore -v -z --stdin [42ms]
2026-08-26 12:56:16.122 [info] > git log --format=%H%n%aN%n%aE%n%at%n%ct%n%P%n%D%n%B -z --shortstat --diff-merges=first-parent -n50 --skip=0 --topo-order --decorate=full --stdin [42ms]
2026-08-26 12:56:16.122 [info] fatal: bad revision 'refs/heads/master'
2026-08-26 12:56:16.122 [error] [GitHistoryProvider][provideHistoryItems] Failed to get history items with options '{"historyItemRefs":["refs/heads/master"],"limit":50,"skip":0}': Failed to execute git {
  "exitCode": 128,
  "gitCommand": "log",
  "stdout": "",
  "stderr": "fatal: bad revision 'refs/heads/master'\n"
}
2026-08-26 12:56:23.272 [info] > git add -A -- . [41ms]
2026-08-26 12:56:23.272 [info] fatal: Unable to create 'C:/Users/wanda/OneDrive/Desktop/PrototimoHenaos/.git/index.lock': File exists.

Another git process seems to be running in this repository, or the lock file may be stale
2026-08-26 12:56:23.375 [info] > git add -A -- . [40ms]
2026-08-26 12:56:23.375 [info] fatal: Unable to create 'C:/Users/wanda/OneDrive/Desktop/PrototimoHenaos/.git/index.lock': File exists.

Another git process seems to be running in this repository, or the lock file may be stale
2026-08-26 12:56:23.650 [info] > git add -A -- . [57ms]
2026-08-26 12:56:23.650 [info] fatal: Unable to create 'C:/Users/wanda/OneDrive/Desktop/PrototimoHenaos/.git/index.lock': File exists.

Another git process seems to be running in this repository, or the lock file may be stale
2026-08-26 12:56:24.161 [info] > git add -A -- . [43ms]
2026-08-26 12:56:24.161 [info] fatal: Unable to create 'C:/Users/wanda/OneDrive/Desktop/PrototimoHenaos/.git/index.lock': File exists.

Another git process seems to be running in this repository, or the lock file may be stale
2026-08-26 12:56:25.010 [info] > git add -A -- . [41ms]
2026-08-26 12:56:25.010 [info] fatal: Unable to create 'C:/Users/wanda/OneDrive/Desktop/PrototimoHenaos/.git/index.lock': File exists.

Another git process seems to be running in this repository, or the lock file may be stale
2026-08-26 12:56:26.305 [info] > git add -A -- . [41ms]
2026-08-26 12:56:26.305 [info] fatal: Unable to create 'C:/Users/wanda/OneDrive/Desktop/PrototimoHenaos/.git/index.lock': File exists.

Another git process seems to be running in this repository, or the lock file may be stale
2026-08-26 12:56:28.158 [info] > git add -A -- . [49ms]
2026-08-26 12:56:28.158 [info] fatal: Unable to create 'C:/Users/wanda/OneDrive/Desktop/PrototimoHenaos/.git/index.lock': File exists.

Another git process seems to be running in this repository, or the lock file may be stale
2026-08-26 12:56:30.662 [info] > git add -A -- . [48ms]
2026-08-26 12:56:30.662 [info] fatal: Unable to create 'C:/Users/wanda/OneDrive/Desktop/PrototimoHenaos/.git/index.lock': File exists.

Another git process seems to be running in this repository, or the lock file may be stale
2026-08-26 12:56:33.916 [info] > git add -A -- . [41ms]
2026-08-26 12:56:33.916 [info] fatal: Unable to create 'C:/Users/wanda/OneDrive/Desktop/PrototimoHenaos/.git/index.lock': File exists.

Another git process seems to be running in this repository, or the lock file may be stale
2026-08-26 12:56:38.031 [info] > git add -A -- . [50ms]
2026-08-26 12:56:38.031 [info] fatal: Unable to create 'C:/Users/wanda/OneDrive/Desktop/PrototimoHenaos/.git/index.lock': File exists.

Another git process seems to be running in this repository, or the lock file may be stale
2026-08-26 12:56:43.088 [info] > git add -A -- . [44ms]
2026-08-26 12:56:43.088 [info] fatal: Unable to create 'C:/Users/wanda/OneDrive/Desktop/PrototimoHenaos/.git/index.lock': File exists.

Another git process seems to be running in this repository, or the lock file may be stale
2026-08-26 12:56:43.098 [info] [Git][getRemotes] No remotes found in the git config file
2026-08-26 12:56:43.137 [info] > git config --get commit.template [44ms]
2026-08-26 12:56:43.141 [info] > git for-each-ref --format=%(refname)%00%(upstream:short)%00%(objectname)%00%(upstream:track)%00%(upstream:remotename)%00%(upstream:remoteref) --ignore-case refs/heads/master refs/remotes/master [43ms]
2026-08-26 12:56:43.141 [warning] [Git][getBranch] No such branch: master
2026-08-26 12:56:43.188 [info] > git for-each-ref --sort -committerdate --format %(refname)%00%(objectname)%00%(*objectname) [40ms]
2026-08-26 12:56:43.584 [info] > git status -z -uall [440ms] (cancelled)products = await ProductService.getAllProducts(); res.status(200).json({ ok: true, count: products.length, products }) } catch (error) { next(error) }
}

export async function getProductById(req, res, next) {
  try {
    const product = await ProductService.getProductById(req.params.id)
    res.status(200).json({ ok: true, product })
  } catch (error) { next(error) }
}

export async function createProduct(req, res, next) {
  try {
    const product = await ProductService.createProduct(req.body)
    res.status(201).json({ ok: true, msg: 'Producto creado con éxito', product })
  } catch (error) { next(error) }
}

export async function updateProduct(req, res, next) {
  try {
    const product = await ProductService.updateProduct(req.params.id, req.body)
    res.status(200).json({ ok: true, msg: 'Producto actualizado con éxito', product })
  } catch (error) { next(error) }
}

export async function deleteProduct(req, res, next) {
  try {
    const product = await ProductService.deleteProduct(req.params.id)
    res.status(200).json({ ok: true, msg: 'Producto eliminado correctamente', product })
  } catch (error) { next(error) }
}
